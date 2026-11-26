$(document).ready(function () {
  // 1. Menu tab switching
  $('.menu-tab').on('click', function () {
    const targetId = $(this).data('tab');

    $('.menu-tab')
      .removeClass('bg-emerald-500 text-slate-950')
      .addClass('text-slate-300 hover:bg-slate-800');

    $(this)
      .removeClass('text-slate-300 hover:bg-slate-800')
      .addClass('bg-emerald-500 text-slate-950');

    $('.tab-panel').addClass('hidden');
    $('#' + targetId).removeClass('hidden');
  });

  // 2. Process text data
  $('#process-btn').on('click', function () {
    const rawText = $('#note-input').val().trim();
    if (!rawText) return;

    $.ajax({
      url: '/api/process',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ text: rawText }),
      success: function (response) {
        $('#result-output')
          .removeClass('hidden')
          .text('Processed: ' + JSON.stringify(response));
      },
      error: function () {
        const wordCount = rawText.split(/\s+/).length;
        $('#result-output')
          .removeClass('hidden')
          .text(`Words: ${wordCount} | Chars: ${rawText.length} | Upper: ${rawText.toUpperCase()}`);
      }
    });
  });

  // 3. Selected file info
  $('#demo_image').on('change', function () {
    const file = this.files[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1);
      $('#selected-file-info').text(`Selected: ${file.name} (${sizeKB} KB)`);
    } else {
      $('#selected-file-info').text('No file selected yet.');
    }
  });

  $('#upload-form').on('reset', function () {
    $('#selected-file-info').text('No file selected yet.');
  });
});