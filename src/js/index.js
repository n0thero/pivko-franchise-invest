import './../index.html';
import './../css/styles.css';
import $ from 'jquery';

setTimeout(console.clear, 500);

$('#toggle-overlay').click(() => {
  $('#overlay').toggle();
});
