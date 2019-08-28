import './../index.html';
import './../css/styles.css';
import './../css/styles-resp.css';
import './../../node_modules/lity/dist/lity.min.css';
import $ from 'jquery';
import lity from 'lity';

window.isMobile = false;

setTimeout(console.clear, 500);

$('#toggle-overlay')
    .click(() => $('#overlay').toggle());

$(document)
    .ready(() => {
      handleHeader();
      handleFixedSidebar();
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
    .mouseenter((e) => {
      
      let achievementCode = $(e.target).is('img')
          ? $(e.target).parent('div').attr('data-achievement-code')
          : $(e.target).attr('data-achievement-code');
      
      showAchievementDescription(achievementCode);
    })
    .mouseout(() => hideAchievementDescription())
    .mouseleave(() => hideAchievementDescription());

$('.investing-form form').submit((e) => {
  e.preventDefault();
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

function showAchievementDescription(code) {
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  let texts = {
    top_100: {
      title: 'ТОП-100 франшиз России 2018',
      body: '7 место в рейтинге из 500 франшиз России на сайте beboss.ru'
    },
    awards_2018: {
      title: 'Франчайзи года и Прорыв года',
      body: 'Лучшие показатели франчайзи и самый высокий прирост за 2018 год.'
    },
    cherry_silver: {
      title: 'Всероссийская франчайзинговая премия',
      body: '2 место по количеству голосов среди 10 лучших франшиз России'
    },
    top_2: {
      title: 'Рейтинг франшиз России 2018',
      body: '2-е место в номинации Розничная торговля на сайте beboss.ru'
    },
    awards_2017: {
      title: 'Франчайзер года и Выбор народа',
      body: 'Лучшие финансовые показатели франчайзи и первое место по количеству голосов'
    },
    cherry_gold: {
      title: 'Лучший талисман франшизы на сайте beboss.ru',
      body: 'Победитель премии в номинации Лучший талисман франшизы и 38 место в топ-100 франшиз России'
    }
  };
  
  let blocks = {
    wrap: $('.achievement-description-wrap')
  };
  
  blocks.title = $(blocks.wrap).find('.x-title');
  blocks.body = $(blocks.wrap).find('.x-body');
  
  $(blocks.title).html(texts[code].title);
  $(blocks.body).html(texts[code].body);
  
  $(blocks.wrap).css({
    opacity: 1,
    top: '595px'
  });
}

function hideAchievementDescription() {
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  window.hideAchievementDescriptiontTimeout = setTimeout(() => {
    $('.achievement-description-wrap').css({
      opacity: 0,
      top: '585px'
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