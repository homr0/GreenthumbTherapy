document.addEventListener('DOMContentLoaded', function() {
  // Initializes Materialize JavaScript components.
  const parallax = M.Parallax.init(document.querySelectorAll('.parallax'));
  const select = M.FormSelect.init(document.querySelectorAll('select'));
  const tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
});