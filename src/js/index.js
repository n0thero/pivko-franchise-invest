import './../index.html';
import './../css/styles.css';
import './../css/styles-resp.css';
import './../../node_modules/lity/dist/lity.min.css';
import 'jquery.inputmask';
import 'inputmask.numeric.extensions';
import $ from 'jquery';
import lity from 'lity';

require('webpack-jquery-ui/slider');
require('webpack-jquery-ui/css');

window.isMobile = false;

$('#toggle-overlay')
    .click(() => $('#overlay').toggle());

$(document)
    .ready(() => {
      window.isMobile = window.innerWidth <= +768;
      maskPhoneInput();
      showAchievementDescription();
      handleHeader();
      handleFixedSidebar();
      initInvestmentsSlider();
    })
    .scroll(() => {
      window.isMobile = window.innerWidth <= +768;
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
  changeRisksTab(e.target);
});

$('.show-more-main-info').click((e) => {
  showMoreMainInfo(e.target);
});

$('form').submit(() => {
  submitForm()
});

function maskPhoneInput() {
  $('[name="phone"]').inputmask('+7 (999) 999-99-99');
}

function changeRisksTab(tab) {
  
  if (window.risksSliderAnimatingNow === true) {
    return;
  }
  
  window.risksSliderAnimatingNow = true;
  
  $('.x-tabs-elem').removeClass('x-active');
  $(tab).addClass('x-active');
  
  setTimeout(() => {
    window.risksSliderAnimatingNow = false;
  }, 600);
  
  let $risksTabsVariants = $('.risks-tabs-variants'),
      $sameRisksVariants = $('.same-risks-variants'),
      $movingBorder = $('.tabs-moving-border'),
      tabIndex = getElementIndex(tab),
      borderMovingSize;
  
  $risksTabsVariants.css({
    opacity: 0,
    right: '10px'
  });
  
  $sameRisksVariants.css({
    opacity: 0,
    right: '10px'
  });
  
  setTimeout(() => {
    
    $risksTabsVariants.css({
      transitionDuration: '0s'
    });
    
    $risksTabsVariants.css({
      right: '-10px'
    });
    
    $sameRisksVariants.css({
      transitionDuration: '0s'
    });
    
    $sameRisksVariants.css({
      right: '-10px'
    });
    
    $risksTabsVariants
        .find('.x-variant')
        .css({
          display: 'inline-flex'
        });
    
    $sameRisksVariants
        .find('.x-elements')
        .css({
          display: 'inline-flex'
        });
    
    switch (tabIndex) {
      
      case 0:
        borderMovingSize = '0px';
        $movingBorder.css({
          left: borderMovingSize
        });
        $risksTabsVariants.find('.x-variant').eq(1).hide();
        $risksTabsVariants.find('.x-variant').eq(2).hide();
        $sameRisksVariants.find('.x-elements').eq(1).hide();
        $sameRisksVariants.find('.x-elements').eq(2).hide();
        break;
      
      case 1:
        borderMovingSize = window.isMobile ? '102px' : '148px';
        $movingBorder.css({
          left: borderMovingSize
        });
        $risksTabsVariants.find('.x-variant').eq(0).hide();
        $risksTabsVariants.find('.x-variant').eq(2).hide();
        $sameRisksVariants.find('.x-elements').eq(0).hide();
        $sameRisksVariants.find('.x-elements').eq(2).hide();
        break;
      
      case 2:
        borderMovingSize = window.isMobile ? '204px' : '294px';
        $movingBorder.css({
          left: borderMovingSize
        });
        $risksTabsVariants.find('.x-variant').eq(0).hide();
        $risksTabsVariants.find('.x-variant').eq(1).hide();
        $sameRisksVariants.find('.x-elements').eq(0).hide();
        $sameRisksVariants.find('.x-elements').eq(1).hide();
    }
    
  }, 400);
  
  setTimeout(() => {
    
    $risksTabsVariants.css({
      transitionDuration: '0.3s'
    });
    
    $risksTabsVariants.css({
      opacity: 1,
      right: '0px'
    });
    
    $sameRisksVariants.css({
      transitionDuration: '0.3s'
    });
    
    $sameRisksVariants.css({
      opacity: 1,
      right: '0px'
    });
    
  }, 430);
}

function showMoreMainInfo(btn) {
  $(btn).remove();
  $('.fixed-sidebar .x-body').removeClass('desktop-only');
}

function handleHeader() {
  
  let $header = $('header'),
      linkToMainSiteHeight = $('.main-site-link').innerHeight()
      scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

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
  
  if (typeof code === 'undefined') {
    code = 'top_100';
  }
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  let texts = {
    top_100: {
      title: 'ТОП-100 франшиз России 2018',
      body: '7 место в рейтинге из 500 франшиз России на сайте beboss.ru',
    },
    awards_2018: {
      title: 'Франчайзи года и Прорыв года',
      body: 'Лучшие показатели франчайзи и самый высокий прирост за 2018 год.',
    },
    cherry_silver: {
      title: 'Всероссийская франчайзинговая премия',
      body: '2 место по количеству голосов среди 10 лучших франшиз России',
    },
    top_2: {
      title: 'Рейтинг франшиз России 2018',
      body: '2-е место в номинации Розничная торговля на сайте beboss.ru',
    },
    awards_2017: {
      title: 'Франчайзер года и Выбор народа',
      body: 'Лучшие финансовые показатели франчайзи и первое место по количеству голосов',
    },
    cherry_gold: {
      title: 'Лучший талисман франшизы на сайте beboss.ru',
      body: 'Победитель премии в номинации Лучший талисман франшизы и 38 место в топ-100 франшиз России',
    }
  };
  
  let standardTopPosition = window.isMobile
      ? '532px'
      : '595px';
  
  let standardBottomPosition = '45px';
  
  let blocks = {
    wrap: $('.achievement-description-wrap'),
    ul: $('.achievements-on-map')
  };
  
  blocks.title = $(blocks.wrap).find('.x-title');
  blocks.body = $(blocks.wrap).find('.x-body');
  
  $(blocks.title).html(texts[code].title);
  $(blocks.body).html(texts[code].body);
  
  if (window.isMobile) {
    
    $(blocks.wrap).css({
      top: 'auto'
    });
    
    $(blocks.wrap).css({
      opacity: 1,
      bottom: standardBottomPosition
    });
    
  } else {
    
    $(blocks.wrap).css({
      opacity: 1,
      top: standardTopPosition
    });
    
  }
  
}

function hideAchievementDescription() {
  
  if (window.isMobile) return;
  
  let standardTopPosition = window.isMobile
      ? '522px'
      : '585px';
  
  let standardBottomPosition = '25px';
  
  if (window.hideAchievementDescriptiontTimeout !== undefined) {
    clearTimeout(window.hideAchievementDescriptiontTimeout);
  }
  
  if (window.isMobile) {
  
    window.hideAchievementDescriptiontTimeout = setTimeout(() => {
      $('.achievement-description-wrap').css({
        opacity: 0,
        bottom: standardBottomPosition,
        top: 'auto'
      });
    }, 500);
    
  } else {
    
    window.hideAchievementDescriptiontTimeout = setTimeout(() => {
      $('.achievement-description-wrap').css({
        opacity: 0,
        top: standardTopPosition
      });
    }, 500);
    
  }
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
    animate: "slow",
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

function getElementIndex(node) {
  
  let index = 0;
  
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}

function submitForm() {
  let loadingAnimation =
      '<lottie-player \n' +
      '    src="https://assets7.lottiefiles.com/packages/lf20_Xo5Ikn.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"    autoplay >\n' +
      '</lottie-player>';
  
  let $blocks = {
    form: $('.x-form-wrap'),
    loadingWrap: $('.x-loading-wrap'),
    loadingAnimation: $('.x-loading-animation'),
    loadingTextWrap: $('.x-loading-text'),
    mainElements: $('.x-form-wrap .x-main-elements-wrap'),
    animation: $('.x-form-wrap .x-loading-animation')
  };
  
  $blocks.form.css({
    maxHeight: '415px'
  });
  
  $blocks.mainElements.css({
    opacity: 0,
    maxHeight: 0
  });
  
  $blocks.loadingWrap.css({
    opacity: 1,
    maxHeight: '415px'
  });
  
  setTimeout(() => {
    
    $blocks.loadingAnimation.html(loadingAnimation);
    
    $blocks.loadingAnimation.css({
      opacity: 1,
    });
  
    setTimeout(() => {
      $blocks.loadingTextWrap.css({
        opacity: 1,
      });
    }, 5000);
    
  }, 300);
  
}

