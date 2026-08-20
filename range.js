/* ------------------------------------------------------------------ *
 * Settings
 * ------------------------------------------------------------------ */
var MAX_RANGE  = 10000;  // biggest single range that will be expanded
var MIN_DIGITS = 7;      // anything shorter is treated as a fragment, not a number
var DEDUPE     = true;   // drop repeated numbers from the output
var AUTO_COPY  = true;   // copy the result to the clipboard automatically

/* Every dash-like character people paste in from Word, Excel or email:
   hyphen, non-breaking hyphen, figure dash, en dash, em dash, horizontal bar,
   hyphen bullet, minus sign, small/fullwidth hyphens, tilde. */
var DASHES     = /[\u2010\u2011\u2012\u2013\u2014\u2015\u2043\u2212\uFE58\uFE63\uFF0D~]/g;
/* Non-breaking, thin, zero-width and ideographic spaces. */
var ODD_SPACES = /[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g;

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */
function normalizeInput(raw) {
  return String(raw)
    .replace(DASHES, '-')                                              // en dash, em dash, minus sign etc. -> -
    .replace(ODD_SPACES, ' ')                                          // nbsp -> space
    .replace(/(\d)\s*(?:to|thru|through|until)\s*(\d)/gi, '$1-$2')     // "1000 to 1009"
    .replace(/[ \t]*-[ \t]*/g, '-');                                   // "1000 - 1009" -> "1000-1009"
}

function digitsOnly(s) {
  return s.replace(/\D/g, '');
}

/* A chunk can be a list of numbers ("033631000 033631005") or one number
   written in groups ("+64 3 363 1000"). Decide which. */
function mergeOrSplit(text) {
  var groups = text.trim().split(/\s+/).map(digitsOnly).filter(function (g) { return g !== ''; });
  if (groups.length > 1) {
    var joined = groups.join('');
    var looksGrouped = groups.every(function (g) { return g.length <= 5; });
    if (looksGrouped && joined.length >= MIN_DIGITS && joined.length <= 13) return [joined];
  }
  return groups;
}

function padTo(numStr, width) {
  return numStr.length >= width ? numStr : new Array(width - numStr.length + 1).join('0') + numStr;
}

/* Add the NZ trunk "0" only for local-format numbers.
   Already starts with 0, or is in country-code format (64...) -> leave alone. */
function applyLocalPrefix(numStr) {
  if (numStr.charAt(0) === '0') return numStr;
  if (numStr.indexOf('64') === 0 && numStr.length >= 10) return numStr;
  return '0' + numStr;
}

function expandRange(startRaw, endRaw, out, notes) {
  var width = Math.max(startRaw.length, endRaw.length);
  var endStr = endRaw;
  /* Shorthand end: 033631000-009 means 033631000-033631009 */
  if (endRaw.length < startRaw.length) {
    endStr = startRaw.slice(0, startRaw.length - endRaw.length) + endRaw;
  }
  var start = Number(startRaw);
  var end   = Number(endStr);
  if (!isFinite(start) || !isFinite(end)) {
    notes.push('Could not read the range "' + startRaw + '-' + endRaw + '".');
    return;
  }
  if (end < start) { var t = start; start = end; end = t; }   // reversed range
  var count = end - start + 1;
  if (count > MAX_RANGE) {
    notes.push('Skipped ' + startRaw + '-' + endStr + ' - that is ' + count.toLocaleString() +
               ' numbers (limit ' + MAX_RANGE.toLocaleString() + ').');
    return;
  }
  for (var n = start; n <= end; n++) out.push(padTo(String(n), width));
}

function processSegment(segment, out, notes) {
  var seg = segment.trim();
  if (seg === '' || !/\d/.test(seg)) return;

  var hyphens = (seg.match(/-/g) || []).length;

  if (hyphens === 0) {
    mergeOrSplit(seg).forEach(function (n) { out.push(n); });
    return;
  }

  if (hyphens === 1) {
    var halves = seg.split('-');
    var left  = mergeOrSplit(halves[0]);
    var right = mergeOrSplit(halves[1]);
    if (left.length === 0 || right.length === 0) {          // one-sided, e.g. "033631000-"
      left.concat(right).forEach(function (n) { out.push(n); });
      return;
    }
    left.slice(0, -1).forEach(function (n) { out.push(n); });    // extras before the range
    expandRange(left[left.length - 1], right[0], out, notes);
    right.slice(1).forEach(function (n) { out.push(n); });       // extras after the range
    return;
  }

  notes.push('Ignored "' + seg + '" - more than one dash, so the range is ambiguous.');
}

function convertToPort(input) {
  var notes = [];
  var raw   = [];

  normalizeInput(input).split(/[\r\n]+/).forEach(function (line) {
    line.split(/[,;|\t]+/).forEach(function (seg) { processSegment(seg, raw, notes); });
  });

  var kept = [];
  var dropped = [];
  raw.forEach(function (n) {
    if (/^0+$/.test(n)) { dropped.push(n); return; }            // all zeros
    if (n.length < MIN_DIGITS) { dropped.push(n); return; }     // fragment
    kept.push(applyLocalPrefix(n));
  });
  if (dropped.length) {
    notes.push('Ignored ' + dropped.length + ' fragment' + (dropped.length === 1 ? '' : 's') +
               ' too short to be a number: ' + dropped.slice(0, 12).join(', ') +
               (dropped.length > 12 ? ' ...' : ''));
  }

  var lines = kept;
  var duplicates = 0;
  if (DEDUPE) {
    var seen = {};
    var unique = [];
    lines.forEach(function (n) {
      if (seen[n]) { duplicates++; return; }
      seen[n] = true;
      unique.push(n);
    });
    lines = unique;
  }

  return { outputText: lines.join('\n'), lineCount: lines.length, duplicates: duplicates, notes: notes };
}

/* ------------------------------------------------------------------ *
 * Page wiring
 * ------------------------------------------------------------------ */
function formatPort() {
  var input  = document.getElementById('portList').value;
  var result = convertToPort(input);

  document.getElementById('formattedPort').textContent = result.outputText;

  var summary = 'Total lines: ' + result.lineCount;
  if (DEDUPE && result.duplicates > 0) {
    summary += ' (' + result.duplicates + ' duplicate' + (result.duplicates === 1 ? '' : 's') + ' removed)';
  }
  document.getElementById('counter').textContent = summary;
  document.getElementById('notes').textContent = result.notes.join('  ');

  if (AUTO_COPY && result.outputText !== '') copyPlainText(result.outputText);
}

function copyPlainText(text) {
  // Preferred: Clipboard API writes a raw string, guaranteed plain text
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  // Fallback for older browsers: copy from a hidden textarea (still plain text)
  var temp = document.createElement('textarea');
  temp.value = text;
  temp.style.position = 'fixed';
  temp.style.opacity = '0';
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    alert('Unable to copy the list. Your browser may not support this feature.');
  }
  document.body.removeChild(temp);
}

var textarea = document.getElementById('portList');
/* Clear the box on focus, ready for the next paste. */
textarea.addEventListener('focus', function () {
  textarea.value = '';
});
/* Ctrl/Cmd + Enter runs the extract. */
textarea.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); formatPort(); }
});
