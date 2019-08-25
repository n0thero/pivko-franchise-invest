import './../index.html';
import './../css/styles.css';
import './../css/styles-resp.css';
import $ from 'jquery';

setTimeout(console.clear, 500);

$('#toggle-overlay')
    .click(() => $('#overlay').toggle());

$(document)
    .scroll(() => handleHeader());

$('.main-site-link')
    .click((e) => {
      if ($(e.target).is('a')) return null;
      window.open('//pivko24.ru')
    });


function handleHeader() {
  
  let $header = $('header'),
      linkToMainSiteHeight = 60,
      scrollTop = document.documentElement.scrollTop;
  
  $header
      .addClass('x-in-scroll');
  
  if (scrollTop > linkToMainSiteHeight) {
    $header.css({top: 0});
  } else {
    $header.css({
      top: linkToMainSiteHeight - scrollTop
    });
    
    if (scrollTop === 0) {
      $header
          .removeClass('x-in-scroll')
          .find('.x-link').removeClass('x-active');
    }
  }
  
  let headerLinksScrollPositions = {
    'about': 0,
    'variants': $('a#variants').offset().top,
    'shops': $('a#shops').offset().top,
    'already-invested': $('a#already-invested').offset().top,
  };
  
  Object.keys(headerLinksScrollPositions).map((key) => {
    
    if (scrollTop === 0) {
      
      $header
          .find('.x-link')
          .removeClass('x-active');
      
    } else if (headerLinksScrollPositions[key] < (scrollTop + 200)) {
      
      $header
          .find('.x-link')
          .not('[href = "#' + key + '"]')
          .removeClass('x-active');
      
      $header
          .find('.x-link[href = "#' + key + '"]')
          .addClass('x-active');
    }
  });
  
}