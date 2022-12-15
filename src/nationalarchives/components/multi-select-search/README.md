# Multi-select search

This component makes a set of checkboxes searchable. It uses progressive enhancement on a set of rendered checkboxes. It constrains the height of the checkbox list (px height overridable in CSS) and captures the `keyup` events on a text input field to search through the checkbox labels.

This component is based on the 'person' filter on [Gov.uk News Finder](https://www.gov.uk/search/news-and-communications).

## JavaScript

```JS
const rootElement = document.querySelector("[data-module=multi-select-search]")
const multiSelectSearch = new MultiSelectSearch(ms);
multiSelectSearch.initialise();
```

## HTML example

```HTML
<div class="tna-multi-select-search"
    data-module="multi-select-search"
    data-copy-single="language"
    data-copy-multiple="lanugages"
    >

  <div class="tna-multi-select-search__filter">
    <label for="language-input-filter" class="govuk-label govuk-visually-hidden">Filter </label>
    <input name="tna-multi-select-search" id="language-input-filter"
        class="tna-multi-select-search__filter-input govuk-input"
        type="text" aria-describedby="languages-filter-count">
  </div>

  <div class="js-selected-count"></div>

  <span id="languages-filter-count"
      class="govuk-visually-hidden js-filter-count"
      aria-live="polite"></span>

  <div class="tna-multi-select-search__list-container js-container">
    <ul class="govuk-checkboxes tna-multi-select-search__list"
        id="language-select" aria-describedby="languages-filter-count">
        <li class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="af" name="languages" type="checkbox" value="af">
          <label class="govuk-label govuk-checkboxes__label" for="af">Afar</label>
        </li>
        <li class="govuk-checkboxes__item">
          <input class="govuk-checkboxes__input" id="ab" name="languages" type="checkbox" value="ab">
          <label class="govuk-label govuk-checkboxes__label" for="ab">Abkhazian</label>
        </li>
        ...
    </ul>
  </div>
</div>
```
