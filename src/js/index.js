import './../index.html';
import './../css/styles.css';
import './../css/styles-resp.css';
import './../../node_modules/lity/dist/lity.min.css';
import $ from 'jquery';
import lity from 'lity';

require('webpack-jquery-ui/slider');
require('webpack-jquery-ui/css');

window.isMobile = false;

setTimeout(console.clear, 500);

$('#toggle-overlay')
    .click(() => $('#overlay').toggle());

$(document)
    .ready(() => {
      handleHeader();
      handleFixedSidebar();
      initInvestmentsSlider();
    })
    .scroll(() => {
      handleHeader();
      handleFixedSidebar();
    });

$('.main-site-link')
    .click((e) => {
      if ($(e.target).is('a')) return null;
      window.open('//pivko24.ru')
    });

$('.scroll-to-form')
    .click(() => scrollToForm());

$('.achievement-element')
    .click((e) => {
      
      let achievementCode = $(e.target).is('img')
          ? $(e.target).parent('div').attr('data-achievement-code')
          : $(e.target).attr('data-achievement-code');
      
      showAchievementDescription(achievementCode, e.type);
    })
    .mouseenter((e) => {
      
      let achievementCode = $(e.target).is('img')
          ? $(e.target).parent('div').attr('data-achievement-code')
          : $(e.target).attr('data-achievement-code');
      
      showAchievementDescription(achievementCode, e.type);
    })
    .mouseout(() => hideAchievementDescription())
    .mouseleave(() => hideAchievementDescription());

$('.investing-form form').submit((e) => {
  e.preventDefault();
});

$('.x-tabs-elem').click((e) => {
  $('.x-tabs-elem').removeClass('x-active');
  $(e.target).addClass('x-active');
});

$('.show-more-main-info').click((e) => {
  $(e.target).remove();
  $('.fixed-sidebar .x-body').removeClass('desktop-only');
});

function handleHeader() {
  
  let $header = $('header'),
      linkToMainSiteHeight = $('.main-site-link').innerHeight(),
      scrollTop = document.documentElement.scrollTop;
  
  window.isMobile = window.innerWidth <= 768;
  
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
  
  if (isMobile) return null;
  
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

function scrollToForm() {
  
  let body = $("html, body"),
      positionScrollTo = $('.investing-form').offset().top - 80;
  
  body.stop().animate(
      {scrollTop: positionScrollTo},
      800, 'swing');
}

function showAchievementDescription(code, eventType) {
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  let texts = {
    top_100: {
      title: 'ТОП-100 франшиз России 2018',
      body: '7 место в рейтинге из 500 франшиз России на сайте beboss.ru',
      paddingLeft: '63px'
    },
    awards_2018: {
      title: 'Франчайзи года и Прорыв года',
      body: 'Лучшие показатели франчайзи и самый высокий прирост за 2018 год.',
      paddingLeft: '-7px'
    },
    cherry_silver: {
      title: 'Всероссийская франчайзинговая премия',
      body: '2 место по количеству голосов среди 10 лучших франшиз России',
      paddingLeft: '-77px'
    },
    top_2: {
      title: 'Рейтинг франшиз России 2018',
      body: '2-е место в номинации Розничная торговля на сайте beboss.ru',
      paddingLeft: '-147px'
    },
    awards_2017: {
      title: 'Франчайзер года и Выбор народа',
      body: 'Лучшие финансовые показатели франчайзи и первое место по количеству голосов',
      paddingLeft: '-217px'
    },
    cherry_gold: {
      title: 'Лучший талисман франшизы на сайте beboss.ru',
      body: 'Победитель премии в номинации Лучший талисман франшизы и 38 место в топ-100 франшиз России',
      paddingLeft: '-287px'
    }
  };
  
  let standardTopPosition = window.isMobile
      ? '532px'
      : '595px';
  
  let blocks = {
    wrap: $('.achievement-description-wrap'),
    ul: $('.achievements-on-map')
  };
  
  blocks.title = $(blocks.wrap).find('.x-title');
  blocks.body = $(blocks.wrap).find('.x-body');
  
  $(blocks.title).html(texts[code].title);
  $(blocks.body).html(texts[code].body);
  
  $(blocks.wrap).css({
    opacity: 1,
    top: standardTopPosition
  });
  
  if (window.isMobile && eventType === 'click') {
    $(blocks.ul[0]).css({
      'left': texts[code].paddingLeft
    });
  }
}

function hideAchievementDescription() {
  
  if (window.isMobile) return;

  let standardTopPosition = window.isMobile
      ? '522px'
      : '585px';
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  window.hideAchievementDescriptiontTimeout = setTimeout(() => {
    $('.achievement-description-wrap').css({
      opacity: 0,
      top: standardTopPosition
    });
  }, 500);
}

function handleFixedSidebar() {
  
  if (window.isMobile) return null;
  
  let $sidebar = $('.fixed-sidebar-wrap'),
      $mainInfoWrap = $('.main-info'),
      $mainInfoBlock = $('.main-info-body'),
      fixedHeaderHeight = 60,
      scrollTop = document.documentElement.scrollTop,
      secondPartTop = $('.main-info .x-part-second').offset().top;
  
  let infoBlockStartPosition = $mainInfoBlock.offset().top - fixedHeaderHeight - 20,
      mainInfoWrapTop = $mainInfoWrap.offset().top,
      sidebarHeight = $sidebar.height();
  
  if (scrollTop > infoBlockStartPosition) {
    
    if (scrollTop > (secondPartTop - sidebarHeight - 149)) {
      $sidebar.css({
        position: 'absolute',
        left: 0,
        top: (secondPartTop - sidebarHeight - mainInfoWrapTop - 149) + 'px'
      });
    } else {
      $sidebar.css({
        position: 'absolute',
        top: (scrollTop - mainInfoWrapTop) + 'px'
      });
    }
    
    $mainInfoBlock.css({
      marginLeft: '390px'
    });
    
  } else {
    
    $mainInfoBlock.css({
      marginLeft: 0
    });
    
    $sidebar.css({
      position: 'static',
      left: 0,
      top: 0
    });
    
  }
}

function initInvestmentsSlider() {
  
  let $formSlider = $('.form-slider'),
      $investmentsDisplayValue = $('.investments-value'),
      $input = $('input[name = "sum"]');
  
  $formSlider.slider({
    range: "min",
    value: 5420000,
    min: 1000000,
    max: 10000000,
    slide: function (event, ui) {
      let localizedSum = (ui.value).toLocaleString('ru');
      $investmentsDisplayValue.html(localizedSum);
      $input.val(localizedSum);
    }
  });
  
}