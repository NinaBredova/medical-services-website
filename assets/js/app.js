["load", "resize"].forEach((event) => {
  window.addEventListener(event, function () {
    let headerHeight = header.clientHeight;
    const main = document.querySelector(".main");
    const plashka = header.querySelector(".header-top");
    if (plashka) {
      var originalHeightPlashka = plashka.offsetHeight;
    }
    window.onscroll = function (e) {
      if (window.scrollY > headerHeight) {
        if (!header.classList.contains("fixed")) {
          header.classList.add("fixed");
          main.removeAttribute("style");
        }
        main.style.marginTop = headerHeight + "px";
      } else {
        if (plashka) {
          plashka.style.height = originalHeightPlashka + "px";
          plashka.classList.remove("hide");
        }
        header.classList.remove("show-plashka");
        header.classList.remove("fixed");
        main.removeAttribute("style");
      }
    };
  });
});

// function calcHeaderHeight() {
//   const header = document.querySelector('header');
//   if (header) {
//     return header.offsetHeight;
//   }
//   return 0;
// }

// function applyHeaderHeightToCSS() {
//   const headerHeight = calcHeaderHeight();
//   document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
// }
// window.addEventListener('load', applyHeaderHeightToCSS);
// window.addEventListener('resize', applyHeaderHeightToCSS);


/* count-item-result */

let count = () => {
  const containers = document.querySelectorAll('.count-item-content');

  containers.forEach(container => {
    let items = [];
    const activeTab = container.querySelector('.tab-content.active');
    
    if (activeTab) {
      items = activeTab.querySelectorAll('.count-item');
    } else {
      items = container.querySelectorAll('.count-item');
    }

    const result = container.querySelector('.count-item-result');
    if ((items.length > 0) && (result)) {
      let a = 0;
      items.forEach(item => {
        if (!item.classList.contains('hide-search') && !item.classList.contains('hide')) {
          a += 1;
        }
      });
      const span = result.querySelector('span');
      if (span) {
        span.textContent = a;
      }
    }
  });
}

/* end count-item-result */

/*     a11y: false, */
let scrollWidthFunc = () => {
  let scrollWidth = window.innerWidth - document.body.clientWidth;
  document.querySelector("html").style.paddingRight = scrollWidth + "px";
  document.querySelector("header").style.paddingRight = scrollWidth + "px";
};
let calculateAngle = function (e, item, parent) {
  let dropShadowColor = `rgba(0, 0, 0, 0.5)`;
  let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
  let y = Math.abs(item.getBoundingClientRect().y - e.clientY);
  let halfWidth = item.getBoundingClientRect().width / 2;
  let halfHeight = item.getBoundingClientRect().height / 2;
  let calcAngleX = (x - halfWidth) / 10;
  let calcAngleY = (y - halfHeight) / 14;
  parent.style.perspective = `${halfWidth * 12}px`;
  item.style.perspective = `${halfWidth * 12}px`;
  item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
  let calcShadowX = (x - halfWidth) / 10;
  let calcShadowY = (y - halfHeight) / 8;
  item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
};

const headerPlashka = document.querySelector(".header__plashka");
const headerPlashkaInner = document.querySelector(".header__plashka-height");
if (headerPlashka && headerPlashkaInner) {
  window.onscroll = function (e) {
    let headerHeight = header.clientHeight;
    if (window.scrollY > headerHeight) {
      if (!header.classList.contains("scrolled")) {
        header.classList.add("scrolled");
        headerPlashka.style.height = "0px";
      }
    } else {
      let height = headerPlashkaInner.offsetHeight;
      headerPlashka.style.height = height + "px";
      header.classList.remove("scrolled");
    }
  };
}


/* tabbs */
const tabbs = document.querySelectorAll(".tabbs");
if (tabbs.length > 0) {
  tabbs.forEach((elem) => {
    const tabb = elem.querySelectorAll(".tabb");
    const content = elem.querySelectorAll(".tabb__content");
    for (let i = 0; i < tabb.length; i++) {
      tabb[i].addEventListener("click", () => {
        if (tabb[i].classList.contains("active")) {
          tabb[i].classList.remove("active");
          if (content[i]) {
            content[i].classList.remove("active");
          }
        } else {
          tabb.forEach((item) => {
            item.classList.remove("active");
          });
          content.forEach((item) => {
            item.classList.remove("active");
          });
          tabb[i].classList.add("active");
          if (content[i]) {
            content[i].classList.add("active");
          }
        }
      });
    }
  });
}


/* search */
function search() {
  let inputSearch = document.querySelectorAll(".search-input");
  if (inputSearch.length > 0) {
    inputSearch.forEach((elem) => {
      const filter = elem.value.toUpperCase();
      const wrapper = elem.closest('.search-wrapper');
      if (wrapper) {
        const list = wrapper.querySelectorAll('.search-list');
        list.forEach((el) => {
          let item = el.querySelectorAll('.search-item');
          for (let i = 0; i < item.length; i++) {
            let name = item[i].querySelector('.search-name');
            let textToSearch = name ? name.textContent : item[i].textContent;
            if (filter) {
              if (textToSearch.toUpperCase().indexOf(filter) > -1) {
                item[i].classList.add("show-search");
                item[i].classList.remove('hide-search');
              } else {
                item[i].classList.remove('show-search');
                item[i].classList.add('hide-search');
              }
            } else {
              item[i].classList.remove('show-search');
              item[i].classList.remove('hide-search');
            }
          }
        });
      }
    });
    count();
    document.addEventListener('keyup', search);
  }
}
search();
/* end search */

count();

/* filter */
const filterBlock = document.querySelector('.filter-block');
if (filterBlock) {
  const filterBlockFilters = document.querySelectorAll('.filter-block__filter');
  const filterBlockItem = filterBlock.querySelectorAll('.filter-block__item');
  if (filterBlockFilters.length > 0 && filterBlockItem.length > 0) {
    filterBlockFilters.forEach(filterBlockFilter => {
      const filterBlockCurrent = filterBlockFilter.querySelector('.filter-block__filter-current');
      const filterBlockBtns = filterBlockFilter.querySelectorAll('.filter-block__filter-btn');
      const filterBlockSearch = filterBlock.querySelector('.filter-block__search-input');
      const filterBlockContainer = filterBlockFilter.querySelector('.filter-block__filter-container');
      const filterDescription = filterBlockCurrent.querySelector('span').textContent;
      const closeButton = filterBlockFilter.querySelector('.close-filter');

      filterBlockCurrent.addEventListener('click', () => {
        filterBlockContainer.classList.add('active');
        scrollWidthFunc();
        document.body.classList.add('lock');
        document.querySelector('html').classList.add('lock');
      });

      closeButton.addEventListener('click', () => {
        filterBlockContainer.classList.remove('active');
        document.body.classList.remove('lock');
        document.querySelector('html').classList.remove('lock');
        document.querySelector('html').removeAttribute('style');
      });

      document.addEventListener('click', (event) => {
        if (!filterBlockFilter.contains(event.target) && !filterBlockCurrent.contains(event.target)) {
          filterBlockContainer.classList.remove('active');
          document.body.classList.remove('lock');
          document.querySelector('html').classList.remove('lock');
          document.querySelector('html').removeAttribute('style');
        }
      });

      filterBlockBtns.forEach((button) => {
        button.addEventListener('click', () => {
          filterBlockContainer.classList.remove('active');
          document.body.classList.remove('lock');
          document.querySelector('html').classList.remove('lock');
          document.querySelector('html').removeAttribute('style');
          filterBlockCurrent.innerHTML = `<span>${filterDescription}</span> ${button.textContent}`;
          applyFilters();
          count();
          if (filterBlockSearch) {
            filterBlockSearch.value = '';
          }
        });
      });
    });

    function applyFilters() {
      const activeFilters = Array.from(filterBlockFilters).map(filterBlockFilter => {
        const filterBlockCurrent = filterBlockFilter.querySelector('.filter-block__filter-current');
        const filterValue = filterBlockCurrent.innerHTML.split('</span> ')[1]?.trim();
        return filterValue === 'Все' ? null : filterValue;
      }).filter(Boolean);

      for (let i = 0; i < filterBlockItem.length; i++) {
        const itemFilters = filterBlockItem[i].dataset.filter.split('$').map(item => item.trim());
        filterBlockItem[i].classList.remove('hide-search');
        filterBlockItem[i].classList.remove('show-search');
        filterBlockItem[i].classList.remove('hide');
        if (activeFilters.every(filter => itemFilters.includes(filter))) {
          filterBlockItem[i].classList.add('show');
        } else {
          filterBlockItem[i].classList.add('hide');
          filterBlockItem[i].classList.remove('show');
        }
      }

    }

    applyFilters();
  }
}

/* end filter */


document.addEventListener("DOMContentLoaded", function () {

  /* reviews rating */

  if (document.querySelector('.tabs-rating')) {
    const highRatingTab = document.querySelector('.reviews-main__tab:nth-child(2)');
    const lowRatingTab = document.querySelector('.reviews-main__tab:nth-child(3)');
    const reviewsContainer = document.querySelector('.reviews-main-main__inner.search-list');

    if (highRatingTab && lowRatingTab && reviewsContainer) {
      function getRating(review) {
        return review.querySelectorAll('.rating .active').length;
      }

      function sortReviews(order) {
        const reviews = Array.from(reviewsContainer.children);
        reviews.sort((a, b) => {
          const ratingA = getRating(a);
          const ratingB = getRating(b);
          return order === 'high' ? ratingB - ratingA : ratingA - ratingB;
        });
        reviews.forEach(review => reviewsContainer.appendChild(review));
      }

      function setActiveTab(activeTab, inactiveTab) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
      }

      highRatingTab.addEventListener('click', () => {
        sortReviews('high');
        setActiveTab(highRatingTab, lowRatingTab);
      });

      lowRatingTab.addEventListener('click', () => {
        sortReviews('low');
        setActiveTab(lowRatingTab, highRatingTab);
      });

      sortReviews('high');
      setActiveTab(highRatingTab, lowRatingTab);
    }
  }

  /* end reviews rating */


  /* panel */
  const panelItems = document.querySelectorAll(".panel-link");
  panelItems.forEach((elem) => {
    const panelTitle = elem.querySelector(".panel-title");
    const panelBody = elem.querySelector(".panel-body");

    panelTitle.addEventListener("click", function () {
      this.classList.toggle("active");
      panelBody.classList.toggle("active");
    });
  });
  /* end panel */


  /* Mask phone */
  [].forEach.call(
    document.querySelectorAll("input[type=tel]"),
    function (input) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        let reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
  /* End Mask phone */
  // Popups
  function popupClose(popupActive) {
    popupActive.classList.remove("open");
    document.body.classList.remove("lock");
    document.querySelector("html").removeAttribute("style");
    document.querySelector("html").classList.remove("lock");
    document.querySelector("header").removeAttribute("style");
  }
  const popupOpenBtns = document.querySelectorAll(".popup-btn");
  const popups = document.querySelectorAll(".popup");
  const originalTitlePopup2 =
    document.querySelector(".original-title").innerHTML;
  const closePopupBtns = document.querySelectorAll(".close-popup");
  closePopupBtns.forEach(function (el) {
    el.addEventListener("click", function (e) {
      popupClose(e.target.closest(".popup"));
    });
  });
  popupOpenBtns.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      const currentPopup = document.querySelector(`[data-target="${path}"]`);
      if (currentPopup) {
        popups.forEach(function (popup) {
          popupClose(popup);
          popup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup__content")) {
              popupClose(e.target.closest(".popup"));
            }
          });
        });
        currentPopup.classList.add("open");
        if (currentPopup.getAttribute("data-target") == "popup-change") {
          let originaTitle = currentPopup.querySelector(".original-title");
          if (el.classList.contains("change__item-btn")) {
            if (el.classList.contains("doctors__btn")) {
              let currentItem = el.closest(".change__item-title");
              let currentTitile = currentItem.querySelector(".current-title");
              originaTitle.innerHTML =
                "Записаться на приём к врачу:" + currentTitile.innerHTML;
            } else {
              if (el.classList.contains("change__item-btn_current")) {
                originaTitle.textContent = el.textContent;
              } else {
                let currentItem = el.closest(".change__item-title");
                let currentTitile = currentItem.querySelector(".current-title");
                originaTitle.innerHTML = currentTitile.innerHTML;
              }
            }
          } else {
            originaTitle.innerHTML = originalTitlePopup2;
          }
        }
        if (el.classList.contains("reviews__btn")) {
          let currentItem = el.closest(".reviews__item");
          let originalTop = currentPopup.querySelector(
            ".reviews__top_original"
          );
          let originalText = currentPopup.querySelector(
            ".reviews__text_original"
          );
          let originalBottom = currentPopup.querySelector(
            ".reviews__bottom_original"
          );
          originalTop.innerHTML =
            currentItem.querySelector(".reviews__top").innerHTML;
          originalText.innerHTML =
            currentItem.querySelector(".reviews__text").innerHTML;
          originalBottom.innerHTML =
            currentItem.querySelector(".reviews__bottom").innerHTML;
        }
        scrollWidthFunc();
        document.querySelector("html").classList.add("lock");
      }
    });
  });
  /* end popups */

  /* tabs */
  class Tabs {
    container;
    tab_button_class;
    tab_content_class;
    tab_attribute_key;
    tab_attribute_target;
    tab_navigation_next;
    tab_navigation_prev;
    tab_active_name;

    constructor({ container = '.tabs-container', tabs_wrapper_class = '.tabs__wrapper', button_class = '.tab', content_class = '.tab-content', attribute_key = 'path', attribute_target = 'target', nav_next = '.tabs__arrow_next', nav_prev = '.tabs__arrow_prev', name_active = '.tabs__active' } = {}) {
      this.container = container;
      this.tabs_wrapper_class = tabs_wrapper_class;
      this.tab_button_class = button_class;
      this.tab_content_class = content_class;
      this.tab_attribute_key = attribute_key;
      this.tab_attribute_target = attribute_target;
      this.tab_navigation_next = nav_next;
      this.tab_navigation_prev = nav_prev;
      this.tab_active_name = name_active;
    }

    initTabs() {
      document.querySelectorAll(this.container).forEach((wrapper) => {
        this.initTabsWrapper(wrapper);
      });
    }

    initTabsWrapper(wrapper) {
      const tabsWrapper = wrapper.querySelector(this.tabs_wrapper_class);
      const tabsButtonList = wrapper.querySelectorAll(this.tab_button_class);
      const tabsContentList = wrapper.querySelectorAll(this.tab_content_class);
      const tabsNavigationNext = wrapper.querySelector(this.tab_navigation_next);
      const tabsNavigationPrev = wrapper.querySelector(this.tab_navigation_prev);
      const tabActiveName = wrapper.querySelector(this.tab_active_name);
      const tabsClose = document.querySelectorAll('.tabs__close');
      let currentTab = 0;
      if (tabActiveName) {
        tabActiveName.querySelector('.tabs__active-text').textContent = tabsButtonList[currentTab].textContent;
      }

      for (let index = 0; index < tabsButtonList.length; index++) {
        if (tabsButtonList[index].dataset.start === true) {
          currentTab = index;
        }

        tabsButtonList[index].addEventListener('click', () => {
          if (tabsContentList[index]) {
            currentTab = index;
            this.showTabsContent({
              list_tabs: tabsContentList,
              list_buttons: tabsButtonList,
              index: currentTab,
            });
            if (tabActiveName) {
              tabActiveName.querySelector('.tabs__active-text').textContent = tabsButtonList[index].textContent;
              tabActiveName.closest('.tabs').classList.remove('active');
              document.querySelector('html').classList.remove('lock');
            }
          }
        });
      }

      this.showTabsContent({
        list_tabs: tabsContentList,
        list_buttons: tabsButtonList,
        index: currentTab,
      });

      if (tabsNavigationNext) {
        tabsNavigationNext.addEventListener('click', () => {
          if (currentTab + 1 < tabsButtonList.length) {
            currentTab += 1;
          } else {
            currentTab = 0;
          }

          const tabsWrapperPositionX = tabsWrapper.getBoundingClientRect().left;
          const currentTabPositionX = tabsButtonList[currentTab].getBoundingClientRect().left;
          const currentTabPositionXRegardingParent = currentTabPositionX - tabsWrapperPositionX;

          tabsWrapper.scrollBy({
            left: currentTabPositionXRegardingParent,
            behavior: 'smooth'
          });

          this.showTabsContent({
            list_tabs: tabsContentList,
            list_buttons: tabsButtonList,
            index: currentTab,
          });
        });
      }

      if (tabsNavigationPrev) {
        tabsNavigationPrev.addEventListener('click', () => {
          if (currentTab - 1 >= 0) {
            currentTab -= 1;
          } else {
            currentTab = tabsButtonList.length - 1;
          }

          const tabsWrapperPositionX = tabsWrapper.getBoundingClientRect().left;
          const currentTabPositionX = tabsButtonList[currentTab].getBoundingClientRect().left;
          const currentTabPositionXRegardingParent = currentTabPositionX - tabsWrapperPositionX;

          tabsWrapper.scrollBy({
            left: currentTabPositionXRegardingParent,
            behavior: 'smooth'
          });

          this.showTabsContent({
            list_tabs: tabsContentList,
            list_buttons: tabsButtonList,
            index: currentTab,
          });
        });
      }



      if (tabActiveName) {
        tabActiveName.addEventListener('click', function () {
          tabActiveName.closest('.tabs').classList.add('active');
          document.querySelector('html').classList.add('lock');
        });
      }

      if (tabsClose.length > 0) {
        for (let i = 0; i < tabsClose.length; i += 1) {
          const tabClose = tabsClose[i]
          tabClose.addEventListener('click', function () {
            tabClose.closest('.tabs').classList.remove('active');
            document.querySelector('html').classList.remove('lock');
          });
        }
      }

      tabsWrapper.closest('.tabs__container').addEventListener('click', function (e) {
        if (!e.target.closest('.tabs__wrapper')) {
          tabsWrapper.closest('.tabs').classList.remove('active');
          document.querySelector('html').classList.add('lock');
        }
      });
    }

    hideTabsContent({ list_tabs, list_buttons }) {
      list_buttons.forEach((el) => {
        el.classList.remove('active');
      });
      list_tabs.forEach((el) => {
        el.classList.remove('active');
      });
    }

    showTabsContent({ list_tabs, list_buttons, index }) {
      this.hideTabsContent({
        list_tabs,
        list_buttons
      });

      if (list_tabs[index]) {
        list_tabs[index].classList.add('active');
      }

      if (list_buttons[index]) {
        list_buttons[index].classList.add('active');
      }
    }
  }
  new Tabs().initTabs();
  /* End tabs */

  /* navigation */

  const articleNavigation = document.querySelector(".navigation");
  if (articleNavigation) {
    const jsScrollBlockList = document.querySelectorAll(
      ".text__content h1, .text__content h2, .text__content h3, .text__content h4, .text__content h5"
    );

    if (jsScrollBlockList.length > 0) {
      for (let i = 0; i < jsScrollBlockList.length; i += 1) {
        const jsScrollBlock = jsScrollBlockList[i];
        const titleBlock = jsScrollBlock.textContent;
        const articleNavigationList =
          document.querySelector(".navigation__list");
        const articleNavigationItem = document.createElement("li");
        const articleNavigationLink = document.createElement("a");
        articleNavigationItem.classList.add("navigation__item");
        if (jsScrollBlock.tagName == "H1") {
          articleNavigationItem.classList.add("title-h1");
        }
        if (jsScrollBlock.tagName == "H2") {
          articleNavigationItem.classList.add("title-h2");
        } else if (jsScrollBlock.tagName == "H3") {
          articleNavigationItem.classList.add("title-h3");
        } else if (jsScrollBlock.tagName == "H4") {
          articleNavigationItem.classList.add("title-h4");
        } else if (jsScrollBlock.tagName == "H5") {
          articleNavigationItem.classList.add("title-h5");
        } else if (jsScrollBlock.tagName == "H6") {
          articleNavigationItem.classList.add("title-h6");
        }
        articleNavigationLink.classList.add("navigation__link");
        jsScrollBlock.setAttribute("id", `${i}`);
        articleNavigationLink.setAttribute("href", `$${i}`);
        articleNavigationLink.textContent = " " + titleBlock;
        articleNavigationItem.append(articleNavigationLink);
        articleNavigationList.append(articleNavigationItem);
      }
      document.querySelectorAll('a[href^="$"').forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          let href = this.getAttribute("href").substring(1);
          const scrollTarget = document.getElementById(href);
          const topOffset = 280;
          const elementPosition = scrollTarget.getBoundingClientRect().top;
          const offsetPosition = elementPosition - topOffset;
          window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
          });
        });
      });
    } else {
      articleNavigation.querySelector(".navigation").remove();
    }
  }

  /* end navigation */


  /* animation */
  const animationItems = document.querySelectorAll(".animation-item");
  if (animationItems.length > 0) {
    function onEntry(e) {
      e.forEach((e) => {
        e.isIntersecting && e.target.classList.add("animation-active");
      });
    }
    let options = {
      threshold: [0.5],
    },
      observer = new IntersectionObserver(onEntry, options);
    for (let e of animationItems) observer.observe(e);
  }
  /* end animation */
  /* yandex map */
  let flagMap = false;
  document.addEventListener("scroll", function () {
    const blockMap = document.getElementById("map");
    if (blockMap) {
      const posTop = blockMap.getBoundingClientRect().top;

      if (posTop < window.innerHeight && !flagMap) {
        if (
          !document.querySelector(
            '[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]'
          )
        ) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
          document.head.appendChild(script);
        }
        setTimeout(function () {
          ymaps.ready(init);
          function init() {
            const map = document.querySelector("#map");

            if (map) {
              const markerCoordinates = [47.21280619894176, 39.726343006841795];
              const centerCoordinates = [47.21280619894176, 39.726343006841795]

              var myMap = new ymaps.Map("map", {
                center: centerCoordinates,
                zoom: 16,
              });

              myGeoObject = new ymaps.GeoObject();
              myMap.geoObjects.add(
                new ymaps.Placemark(
                  markerCoordinates,
                  {
                    balloonContent: "Метка",
                  },
                  {
                    iconLayout: "default#image",
                    iconImageHref: "assets/img/icons/map-marker.svg",
                    iconImageSize: [80, 80],
                    iconImageOffset: [-40, -80],
                  }
                )
              );

              // Добавляем прямоугольник, обозначающий область
              var rectangle = new ymaps.Rectangle(
                bounds,
                {},
                {
                  fill: false,
                  stroke: true,
                  strokeColor: "#FF0000",
                  strokeWidth: 2,
                }
              );
              myMap.geoObjects.add(rectangle);

              myMap.behaviors.disable(["scrollZoom"]);
              myMap.setBounds(bounds, { checkZoomRange: true });
            }
          }
        }, 500);
        flagMap = true;
      }
    }
  });
  /* end yandex map */

  /* reviews hide */
  function reviewsHide() {
    const reviews = document.querySelectorAll(".reviews__item");
    if (reviews.length > 0) {
      reviews.forEach((item) => {
        if (!item.classList.contains("reviews__item_original")) {
          const reviewsText = item.querySelector(".reviews__text");
          const reviewsBtn = item.querySelector(".reviews__btn ");
          item.style.scale = "1";
          item.style.display = "flex";
          if (reviewsBtn) {
            if (reviewsText.offsetHeight > 150) {
              reviewsText.classList.add("hidden");
              reviewsBtn.classList.add("active");
            }
          }
          item.removeAttribute("style");
        }
      });
    }
  }
  setTimeout(function () {
    reviewsHide();
  }, 100);

  /* end reviews hide */



  const cards = document.querySelectorAll(".card");
  if (cards.length > 0) {
    cards.forEach(function (item) {
      item.addEventListener("mouseenter", function (e) {
        if (window.innerWidth > 1020) {
          calculateAngle(e, this.querySelector(".card__item"), this);
        }
      });
      item.addEventListener("mousemove", function (e) {
        if (window.innerWidth > 1020) {
          calculateAngle(e, this.querySelector(".card__item"), this);
        }
      });
      item.addEventListener("mouseleave", function (e) {
        if (window.innerWidth > 1020) {
          let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
          item.classList.remove("animated");
          item.querySelector(
            ".card__item"
          ).style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
          item.querySelector(
            ".card__item"
          ).style.filter = `drop-shadow(0 5px 5px ${dropShadowColor})`;
        }
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth < 1021) {
        cards.forEach((elem) => {
          elem.removeAttribute("style");
          elem.querySelector(".card__item").removeAttribute("style");
        });
      }
    });
  }


  const burgerMenu = document.querySelector(".burger__menu");
  if (burgerMenu) {
    const headerMobile = document.querySelector(".header__wrapper");
    const header = document.querySelector(".header");
    burgerMenu.addEventListener("click", () => {
      if (burgerMenu.classList.contains("active")) {
      } else {
        let height = header.offsetHeight;
        let topPos = header.getBoundingClientRect().top + window.scrollY;
        headerMobile.style.maxHeight = "calc(150vh - " + height + "px)";
      }
      headerMobile.classList.toggle("active");
      burgerMenu.classList.toggle("active");
      header.classList.toggle("active");
      document.querySelector("html").classList.toggle("burger-lock");
    });
  }
  const headerServiceBtns = document.querySelectorAll(".header__service-btn");
  headerServiceBtns.forEach((headerServiceBtn) => {
    headerServiceBtn.addEventListener("click", () => {
      headerServiceBtn.classList.toggle("active");
      headerServiceBtn.nextElementSibling.classList.toggle("active");
    });
  });


  // разные функции
  const hideItems = document.querySelectorAll(".hide-items");
  if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
      const hideItem = elem.querySelectorAll(".hide-item");
      const hideItems = elem.querySelectorAll(".hide-item");
      const hideTitles = elem.querySelectorAll(".hide-item__title");
      const hideContents = elem.querySelectorAll(".hide-item__content");
      hideItem.forEach((item) => {
        let title = item.querySelector(".hide-item__title");
        let content = item.querySelector(".hide-item__content");
        title.addEventListener("click", () => {
          if (title.classList.contains("active")) {
            title.classList.remove("active");
            content.classList.remove("active");
            item.classList.remove("active");
            content.style.maxHeight = "0";
          } else {
            hideTitles.forEach((element) => {
              element.classList.remove("active");
            });
            hideItems.forEach((element) => {
              element.classList.remove("active");
            });
            hideContents.forEach((element) => {
              element.classList.remove("active");
              element.style.maxHeight = "0";
            });
            let height = content.querySelector(
              ".hide-item_max-height"
            ).offsetHeight;
            title.classList.add("active");
            item.classList.add("active");
            content.classList.add("active");
            content.style.maxHeight = height + "px";
          }
        });
      });
    });
  }

  // sliders
  const doctorsSliderCheck = document.querySelectorAll(".doctors");
  if (doctorsSliderCheck.length > 0) {
    doctorsSliderCheck.forEach((slider) => {
      const swiperDoctors = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".doctors__slider-button_next"),
          prevEl: slider.querySelector(".doctors__slider-button_prev"),
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  const doctorPatentSliderCheck = document.querySelectorAll(".doctor-patent");
  if (doctorPatentSliderCheck.length > 0) {
    doctorPatentSliderCheck.forEach((slider) => {
      const swiperDoctorPatent = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".doctor-patent__slider-button_next"),
          prevEl: slider.querySelector(".doctor-patent__slider-button_prev"),
        },
        pagination: {
          el: ".doctor-patent-pagination",
          type: "bullets",
          clickable: true,
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  const publicationSliderCheck = document.querySelectorAll(".publication");
  if (publicationSliderCheck.length > 0) {
    publicationSliderCheck.forEach((slider) => {
      const swiperPublication = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".publication__slider-button_next"),
          prevEl: slider.querySelector(".publication__slider-button_prev"),
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 2,
            },
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 30,
            grid: {
              rows: 2,
            },

          },
        },
      });
    });
  }

  const documentsSliderCheck = document.querySelectorAll(".documents");
  if (documentsSliderCheck.length > 0) {
    documentsSliderCheck.forEach((slider) => {
      const swiperDocuments = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".documents__slider-button_next"),
          prevEl: slider.querySelector(".documents__slider-button_prev"),
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    });
  }


  const directionsSliderCheck = document.querySelectorAll(".directions");
  if (directionsSliderCheck.length > 0) {
    directionsSliderCheck.forEach((slider) => {
      const swiperDirections = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".directions__slider-button_next"),
          prevEl: slider.querySelector(".directions__slider-button_prev"),
        },
        slidesPerView: 1.2,
        grabCursor: true,
        spaceBetween: 32,

        breakpoints: {
          900: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
        },
      });
    });
  }
  const reviewsSliderCheck = document.querySelectorAll(".reviews");
  if (reviewsSliderCheck.length > 0) {
    reviewsSliderCheck.forEach((slider) => {
      const swiperReviews = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".reviews__slider-button_next"),
          prevEl: slider.querySelector(".reviews__slider-button_prev"),
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          750: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  const stocksSliderCheck = document.querySelectorAll(".stocks");
  if (stocksSliderCheck.length > 0) {
    stocksSliderCheck.forEach((slider) => {
      const swiperstocks = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".stocks__slider-button_next"),
          prevEl: slider.querySelector(".stocks__slider-button_prev"),
        },
        pagination: {
          el: ".stocks-pagination",
          type: "fraction",
        },
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,
        breakpoints: {
          320: {

            pagination: {
              el: ".stocks-pagination-bullets",
              type: "bullets",
              clickable: true,
            },
          },
          650: {
            slidesPerView: 2.3,
            spaceBetween: 20,
            pagination: {
              el: ".stocks-pagination",
              type: "fraction",
            },
          },
        },
      });
    });
  }

  const doctorCheck = document.querySelectorAll(".doctor");
  if (doctorCheck.length > 0) {
    doctorCheck.forEach((slider) => {
      const swiperTabs = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".doctor__slider-button_next"),
          prevEl: slider.querySelector(".doctor__slider-button_prev"),
        },
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,
      });
    });
  }

  const licencesSliderCheck = document.querySelectorAll(".licences");
  if (licencesSliderCheck.length > 0) {
    licencesSliderCheck.forEach((slider) => {
      const swiperLicences = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".licences-button_next"),
          prevEl: slider.querySelector(".licences-button_prev"),
        },
        grabCursor: true,
        slidesPerView: "1.2",
        spaceBetween: 20,
        breakpoints: {
          450: {
            slidesPerView: "2",
            spaceBetween: 20,
          },
        },
      });
    });
  }
  const gallerySliderCheck = document.querySelectorAll(".gallery");
  if (gallerySliderCheck.length > 0) {
    gallerySliderCheck.forEach((slider) => {
      const swiperGallery = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        pagination: {
          el: ".gallery-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: slider.querySelector(".gallery__slider-button_next"),
          prevEl: slider.querySelector(".gallery__slider-button_prev"),
        },
        slidesPerView: 1.2,
        grabCursor: true,
        spaceBetween: 10,

        centerSlides: false,
        breakpoints: {
          650: {
            slidesPerView: 0,
            spaceBetween: 0,
            grabCursor: false,
            allowTouchMove: false,
            allowSlidePrev: false,
            allowSlideNext: false,
          },
        },
      });
    });
  }

  const servicesSliderCheck = document.querySelectorAll(".services");
  if (servicesSliderCheck.length > 0) {
    servicesSliderCheck.forEach((slider) => {
      const swiperServices = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".services__slider-button_next"),
          prevEl: slider.querySelector(".services__slider-button_prev"),
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,
        scrollbar: false,
        breakpoints: {
          650: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 2,

            },

          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
            grid: {
              rows: 2,

            },
          },
        },
      });
    });
  }



  const doclicencesSliderCheck = document.querySelectorAll(".doc-licences");
  if (doclicencesSliderCheck.length > 0) {
    doclicencesSliderCheck.forEach((slider) => {
      const swiperDoclicences = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        pagination: {
          el: ".doc-licences-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          nextEl: slider.querySelector(".doc-licences__slider-button_next"),
          prevEl: slider.querySelector(".doc-licences__slider-button_prev"),
        },
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,

        centerSlides: false,
        breakpoints: {
          1100: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          750: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          550: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    });
  }
  const doctorLicencesCheck = document.querySelectorAll(".doctor-licences");
  if (doctorLicencesCheck.length > 0) {
    doctorLicencesCheck.forEach((slider) => {
      const swiperDoctorLicences = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".doctor-licences-button_next"),
          prevEl: slider.querySelector(".doctor-licences-button_prev"),
        },
        slidesPerView: 1.2,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
          500: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      });
    });
  }
  const chambersMainCheck = document.querySelectorAll(".chambers-main");
  if (chambersMainCheck.length > 0) {
    chambersMainCheck.forEach((slider) => {
      const swiperDoctorLicences = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        pagination: {
          el: ".chambers-main-pagination",
          type: "bullets",
          clickable: true,
        },
        slidesPerView: 1.2,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    });
  }
  const articlesSliderCheck = document.querySelectorAll(".articles");
  if (articlesSliderCheck.length > 0) {
    articlesSliderCheck.forEach((slider) => {
      const swiperArticles = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".articles__slider-button_next"),
          prevEl: slider.querySelector(".articles__slider-button_prev"),
        },
        pagination: {
          el: ".articles-pagination",
          type: "fraction",
        },
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
              el: ".articles-pagination-bullets",
              type: "bullets",
              clickable: true,
            },
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 20,
            pagination: {
              el: ".articles-pagination",
              type: "fraction",
            },
          },
          1140: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
    });
  }
  const chambersCheck = document.querySelectorAll('.chambers__slider');
  if (chambersCheck.length > 0) {
    chambersCheck.forEach((slider) => {
      const swiperChambers = new Swiper(slider.querySelector('.swiper'), {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 15,
        grabCursor: true,
        navigation: {
          nextEl: slider.querySelector(".chambers-button_next"),
          prevEl: slider.querySelector(".chambers-button_prev"),
        },
        pagination: {
          el: ".chambers__pagination",
          clickable: true,
        },
      });
    })
  }

  const centersSliderCheck = document.querySelectorAll(".centers");
  if (centersSliderCheck.length > 0) {
    centersSliderCheck.forEach((slider) => {
      const swiperCenters = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".centers__slider-button_next"),
          prevEl: slider.querySelector(".centers__slider-button_prev"),
        },
        pagination: {
          el: ".centers-pagination",
          type: "fraction",
        },
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,

        breakpoints: {
          320: {
            pagination: {
              el: ".centers-pagination-bullets",
              type: "bullets",
              clickable: true,
            },
          },
          750: {
            pagination: {
              el: ".centers-pagination",
              type: "fraction",
            },
          },
        },
      });
    });
  }


  const programsCheck = document.querySelectorAll(".programs");
  if (programsCheck.length > 0) {
    programsCheck.forEach((slider) => {
      const swiperPrograms = new Swiper(slider.querySelector(".swiper"), {
        direction: "horizontal",
        navigation: {
          nextEl: slider.querySelector(".programs__slider-button_next"),
          prevEl: slider.querySelector(".programs__slider-button_prev"),
        },
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,
        breakpoints: {
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    });
  }

  // end Sliders



  /* search popup*/

  let inputSearch = document.querySelectorAll('input[type=search]');
  if (inputSearch.length > 0) {
    inputSearch.forEach((elem) => {
      const wrapper = elem.closest('.search-wrapper');
      if (wrapper) {
        function search() {
          let filter = elem.value.toUpperCase();
          let ul = wrapper.querySelectorAll('.search-list');
          ul.forEach((item) => {
            let li = item.getElementsByTagName("li");
            for (let i = 0; i < li.length; i++) {
              let a = li[i].querySelector(".search-list__name");
              if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].classList.remove('hide');
              } else {
                li[i].classList.add('hide');
              }

            }

          })
        }
        document.addEventListener('keyup', search);
      }

    })

  }
  /* end search popup*/

  const serviceLists = document.querySelectorAll('.services__list');

  function getCorrectWordForm(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'услуга';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return 'услуги';
    } else {
      return 'услуг';
    }
  }

  serviceLists.forEach(serviceList => {
    const listItems = serviceList.querySelectorAll('ul li');
    const showMoreBtn = serviceList.querySelector('.services__show-more-btn');
    const span = showMoreBtn.querySelector('span');
    const maxVisibleItems = 4;
    const totalItems = listItems.length;

    span.textContent = `/ ${totalItems} ${getCorrectWordForm(totalItems)}`;

    function updateList() {
      listItems.forEach((item, index) => {
        if (index >= maxVisibleItems) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
    }

    function toggleList() {
      const hiddenItems = serviceList.querySelectorAll('ul li.hidden');
      if (hiddenItems.length > 0) {
        listItems.forEach(item => item.classList.remove('hidden'));
        showMoreBtn.textContent = 'Скрыть';
      } else {
        updateList();
        showMoreBtn.innerHTML = `Полный список услуг <span>/ ${totalItems} ${getCorrectWordForm(totalItems)}</span>`;
      }
    }

    updateList();
    showMoreBtn.addEventListener('click', toggleList);
  });


  // close plashka header bottom
  const closeButton = document.querySelector('.header-bottom__plashka-close');
  const plashka = document.querySelector('.header-bottom__plashka');

  closeButton.addEventListener('click', function () {
    plashka.classList.add('hidden');
  });

  // end close plashka header bottom


  // rating 

  const ratingStars = document.querySelectorAll('.rating__star');
  let currentRating = 0;

  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = star.getAttribute('data-value');
      updateRating(currentRating);
    });
  });

  function updateRating(rating) {
    ratingStars.forEach(star => {
      if (star.getAttribute('data-value') <= rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // end rating 

  // footer nav panel

  const buttons = document.querySelectorAll('.footer-nav-panel-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const list = this.closest('.nav-column').querySelector('.footer-nav-panel-list');
      const isActive = list.classList.toggle('active');
      this.classList.toggle('active', isActive); // Добавление/удаление класса active для кнопки
    });
  });

  // end footer nav panel

});