# Workshop Prompt Page Specification

## Purpose

Build a lightweight single-page web application for workshop participants to access, read, and copy AI prompts for improving website text.

The page must support a guided four-step workflow and a simplified quick workflow. It must be optimized for clarity, fast loading, and easy copying during a live workshop.

## Product Goal

The product must allow a user to:

- open one page
- immediately see relevant prompts
- switch between a full workflow and a quick workflow
- copy any prompt with one click
- use the page without login, setup, or navigation to other pages

## Scope

This specification includes:

- UI
- content structure
- functional behavior
- non-functional requirements
- acceptance criteria

This specification excludes:

- backend
- authentication
- analytics
- databases
- user accounts
- CMS integration
- prompt editing by end users
- multilingual support beyond Finnish text already defined

## Target Users

Primary users:

- workshop attendees using AI tools during a workshop

Secondary users:

- workshop facilitator
- participants revisiting the page after the workshop

## Platform Requirements

The application must be implemented as a single-page frontend application.

Preferred implementation target:

- React-based single page or single component

The application must work in modern desktop and mobile browsers.

---

## Functional Requirements

### FR-1 Single Page Layout

The application must render as a single page.

It must not require:

- route changes
- multi-page navigation
- modal-based navigation for core usage

### FR-2 Header

The page must contain a header section with:

- a small label indicating the page purpose
- a main heading
- a short instructional paragraph

The header must communicate that:

- the page contains workshop prompts for improving website text
- prompts should be used in order
- bracketed placeholders must be replaced with the user’s own content

### FR-3 Mode Toggle

The page must provide a toggle with exactly two modes:

- `Täysi versio`
- `Pikaversio`

Behavior:

- full mode must be selected by default
- switching modes must update visible prompt cards immediately
- switching modes must not reload the page

### FR-4 Prompt Cards

Each visible prompt must be rendered in its own card.

Each card must contain:

- step label
- title
- short hint
- prompt text in a readable preformatted block
- a button labeled `Kopioi prompti`

### FR-5 Copy to Clipboard

Each prompt card must include a copy-to-clipboard action.

Behavior:

- clicking the button must copy only the prompt text of that card
- success feedback must be shown immediately
- failure feedback must instruct the user to copy manually

Allowed feedback forms:

- alert
- toast
- inline temporary message

### FR-6 Prompt Sets

The application must support exactly two prompt sets.

#### Full prompt set

Must contain exactly four prompts:

1. `Vaihe 1 – Poimi ydinteksti`
2. `Vaihe 2 – Arvioi teksti`
3. `Vaihe 3 – Kirjoita uusi versio`
4. `Vaihe 4 – Tarkista lopputulos`

#### Quick prompt set

Must contain exactly two prompts:

1. `Pikaversio A – Arvioi teksti`
2. `Pikaversio B – Kirjoita uusi versio`

### FR-7 Footer

The page must include a small footer reminder encouraging users to keep the page open and proceed step by step.

---

## Content Requirements

### CR-1 Language

All visible UI text and all prompt text must be in Finnish.

### CR-2 Prompt Integrity

Prompt text must be displayed exactly as provided by the product owner unless explicitly changed later.

The implementation must preserve:

- line breaks
- numbering
- bullet formatting
- placeholders inside square brackets
- quoted subheadings within prompts

Prompt text must not be truncated, collapsed, or auto-shortened.

### CR-3 Prompt Display

Prompt text must be displayed in a preformatted block.

The display must support:

- multiline text
- wrapped long lines
- readable spacing
- manual text selection as fallback

---

## UX Requirements

### UX-1 Immediate Usability

On first load, the user must immediately understand:

- what the page is for
- that there are two usage modes
- that prompts can be copied
- that prompts should be used in sequence

### UX-2 Low Friction

The application must not require:

- login
- typing before usage
- hidden accordion expansion for core prompts
- setup steps before reading the prompts

### UX-3 Readability

The UI must be visually clean and workshop-friendly.

Required characteristics:

- high contrast text
- large readable headings
- visually separated cards
- sufficient padding
- good spacing
- mobile-friendly layout

### UX-4 Accessibility

The page must meet baseline accessibility expectations:

- buttons must be keyboard accessible
- focus states must be visible
- text must remain readable on small screens
- color contrast must be sufficient
- semantic headings should be used where possible

---

## UI Design Requirements

### UI-1 Visual Style

The design must be minimal and professional.

Preferred style:

- light background
- dark text
- white cards
- subtle borders
- rounded corners
- soft shadows
- no unnecessary animation

### UI-2 Responsive Behavior

Desktop requirements:

- vertically stacked cards
- centered content container
- comfortable maximum width

Mobile requirements:

- full-width readable cards
- no unnecessary horizontal scrolling
- copy buttons must remain easy to use

### UI-3 Required Visible Elements

The page must visibly include:

- header badge
- page title
- description text
- mode toggle buttons
- prompt cards
- copy buttons
- footer hint

---

## Technical Requirements

### TR-1 Framework

The implementation must use React.

React must be explicitly imported.

Example acceptable import:

    import React, { useState } from "react";

### TR-2 State Management

Local component state is sufficient.

Required state:

- current mode: `full` or `quick`

No external state management library is allowed unless separately approved.

### TR-3 Data Structure

Prompt content must be defined in structured in-memory arrays.

Each prompt object must contain at least:

- `step`
- `title`
- `hint`
- `prompt`

### TR-4 Clipboard API

Use the browser clipboard API where available.

Expected method:

    navigator.clipboard.writeText(...)

A graceful failure path must exist.

### TR-5 No Backend

The solution must be fully frontend-only.

No API calls are required.
No persistence is required.

### TR-6 Performance

The page must be lightweight.

Requirements:

- no unnecessary libraries
- no heavy images
- no video
- no data fetching on load
- fast initial render

---

## Prompt Content Model

### Full Version Prompts

#### Prompt 1
- step: `Vaihe 1`
- title: `Poimi ydinteksti`
- hint: user replaces the link
- prompt text:

    Lue tämä verkkosivu: [PASTA LINKKI]

    Tee siitä ensin jäsennelty markdown-versio niin, että erotat toisistaan:

    1. sivun pääotsikon
    2. ingressin tai tärkeimmän arvolupauksen
    3. varsinaiset sisältötekstit
    4. toimintakehotteet (CTA:t)
    5. navigaation ja footerin erilliseen osioon
    6. uutiset, tapahtumat, some-upotukset ja muut tukisisällöt erikseen

    Tärkeää:
    - Älä arvioi vielä sisältöä.
    - Älä paranna tekstiä vielä.
    - Älä kirjoita sivua uudelleen.
    - Säilytä alkuperäinen merkitys.
    - Merkitse selvästi, mikä on varsinaista arvioitavaa ydintekstiä ja mikä on sivun rakenteellista tai toissijaista sisältöä.

    Lopuksi lisää kohta:
    "Arviointiin suositeltava tekstiosuus"

    Nosta siihen ne tekstikohdat, jotka kannattaa seuraavassa vaiheessa arvioida.

#### Prompt 2
- step: `Vaihe 2`
- title: `Arvioi teksti`
- hint: user pastes the extracted core text
- prompt text:

    Arvioi seuraava verkkosivun tekstisisältö.

    Käytä tätä 7 kohdan viitekehystä:
    1. Käyttäjän tarve
    2. Motivaation osuvuus
    3. Arvolupauksen selkeys
    4. Kitka
    5. Luottamus / epävarmuuden vähentäminen
    6. Silmäiltävyys ja selkeä kieli
    7. Toimintakehotteen selkeys

    Ohjeet:
    - Anna jokaisesta kohdasta arvosana 1–5.
    - Perustele jokainen arvosana lyhyesti.
    - Nosta esiin täsmälliset tekstikohdat, jotka vaikuttavat arvioon.
    - Erota selvästi:
      - mikä toimii hyvin
      - mikä heikentää tekstin vaikuttavuutta
    - Lopuksi kerro:
      1. kolme tärkeintä ongelmaa
      2. mitä kannattaa muuttaa ensin
      3. millainen parempi versio tämän sivun tekstistä pitäisi olla

    Tärkeää:
    - Älä kirjoita tekstiä vielä uusiksi.
    - Älä arvioi visuaalista ilmettä, teknistä toteutusta tai uutissisältöjä.
    - Keskity vain annettuun ydintekstiin.

    Arvioitava teksti:

    [LIITÄ TÄHÄN VAIHEESSA 1 EROTELLUT YDINTEKSTIT]

#### Prompt 3
- step: `Vaihe 3`
- title: `Kirjoita uusi versio`
- hint: user pastes original text and evaluation
- prompt text:

    Kirjoita seuraavasta verkkosivun tekstistä parempi versio annetun arvion perusteella.

    Tavoitteet:
    - tee tekstistä käyttäjälähtöisempi
    - selkeytä arvolupausta
    - vähennä abstraktia organisaatiokieltä
    - tee palveluista helpommin ymmärrettäviä
    - vahvista luottamusta
    - paranna silmäiltävyyttä
    - säilytä alkuperäinen asiasisältö

    Tärkeää:
    - Älä keksi uusia palveluja, tuloksia, lukuja tai lupauksia.
    - Älä muuta organisaation roolia tai tehtävää.
    - Älä tee tekstistä ylimarkkinoivaa.
    - Kirjoita suomeksi, selkeästi ja uskottavasti.
    - Tee tekstistä etusivulle sopiva.

    Rakenna vastaus näin:
    1. uusi ehdotus etusivun pääviestiksi
    2. uusi versio ingressistä
    3. parannetut CTA-tekstit
    4. uudet palvelukuvaukset
    5. lyhyt lista tärkeimmistä parannuksista

    Alkuperäinen teksti:
    [LIITÄ ALKUPERÄINEN YDINTEKSTI]

    Arvio:
    [LIITÄ VAIHEESSA 2 SAATU ARVIO]

#### Prompt 4
- step: `Vaihe 4`
- title: `Tarkista lopputulos`
- hint: user pastes original, evaluation, and new version
- prompt text:

    Vertaa alkuperäistä verkkosivun tekstiä ja siitä tehtyä uutta versiota.

    Arvioi:
    1. onko uusi versio aidosti selkeämpi
    2. palveleeko se paremmin ensikävijää
    3. onko arvolupaus nyt ymmärrettävämpi
    4. ovatko CTA:t parempia
    5. onko jotain tärkeää merkitystä kadonnut
    6. onko uusi teksti liian geneerinen, liian myyvä tai liian pitkä

    Anna lopuksi:
    - lyhyt kokonaisarvio
    - 3 asiaa, jotka paranivat
    - 3 asiaa, joita pitäisi vielä hioa
    - lopullinen parannettu versio

    Alkuperäinen teksti:
    [LIITÄ ALKUPERÄINEN]

    Arvio:
    [LIITÄ ARVIO]

    Uusi versio:
    [LIITÄ UUSI VERSIO]

### Quick Version Prompts

#### Prompt A
- step: `Pikaversio A`
- title: `Arvioi teksti`
- hint: quick start
- prompt text:

    Arvioi tämä verkkosivun teksti 7 kriteerillä: käyttäjän tarve, motivaation osuvuus, arvolupauksen selkeys, kitka, luottamus, silmäiltävyys ja CTA:n selkeys.

    Anna jokaisesta arvosana 1–5, perustele lyhyesti, nosta esiin tärkeimmät ongelmat ja kerro, mitä pitäisi muuttaa ensin. Älä kirjoita tekstiä vielä uusiksi.

    Teksti:
    [LIITÄ TEKSTI]

#### Prompt B
- step: `Pikaversio B`
- title: `Kirjoita uusi versio`
- hint: use evaluation as guidance
- prompt text:

    Kirjoita tästä verkkosivun tekstistä parempi versio arvioinnin perusteella.

    Paranna selkeyttä, käyttäjälähtöisyyttä, luottamusta, silmäiltävyyttä ja CTA:ta. Vähennä jargonia ja abstraktia kieltä. Säilytä alkuperäinen merkitys äläkä keksi uusia faktoja.

    Alkuperäinen teksti:
    [LIITÄ TEKSTI]

    Arvio:
    [LIITÄ ARVIO]

---

## Error Handling Requirements

### EH-1 Clipboard Failure

If clipboard access fails:

- notify the user
- instruct the user to copy manually

### EH-2 Rendering Safety

The page must not crash if prompt text contains:

- quotes
- line breaks
- brackets
- numbering
- long paragraphs

### EH-3 React Import

The implementation must not rely on implicit React globals.

It must not throw:

- `ReferenceError: React is not defined`

---

## Out of Scope

Do not implement:

- editable prompts
- saving user inputs
- exporting prompts
- QR code generation
- login
- analytics
- dark mode
- admin panel
- prompt search
- filtering beyond full/quick mode

---

## Acceptance Criteria

### AC-1 Initial Load

- the page loads without runtime errors
- React is properly imported
- full mode is visible by default

### AC-2 Header

- header badge is visible
- main title is visible
- instruction text is visible

### AC-3 Toggle

- the user can switch between full and quick modes
- full mode shows 4 prompt cards
- quick mode shows 2 prompt cards

### AC-4 Prompt Cards

For every visible card:

- step label is shown
- title is shown
- hint is shown
- prompt block is shown
- copy button is shown

### AC-5 Copy Functionality

- clicking `Kopioi prompti` copies the correct prompt only
- the user receives success feedback
- the user receives fallback feedback on failure

### AC-6 Responsiveness

- the page is usable on desktop
- the page is usable on mobile
- prompt text remains readable

### AC-7 Content Integrity

- prompt formatting is preserved
- no prompt text is missing
- no prompt text is truncated
- square-bracket placeholders remain visible

---

## Suggested Test Checklist

### Functional Tests

- load the page
- verify there is no React import error
- verify default mode is full
- switch to quick mode
- switch back to full mode
- click copy on each prompt
- verify copied content matches the visible prompt
- simulate clipboard failure and verify fallback message

### UI Tests

- verify header text is visible
- verify card counts in each mode
- verify buttons are keyboard accessible
- verify long prompt text wraps correctly
- verify mobile layout remains readable

### Regression Tests

- verify prompt text remains unchanged after refactoring
- verify mode switching does not duplicate cards
- verify copy button does not copy the wrong card
- verify line breaks remain preserved

---

## Deliverable

The final deliverable must be:

- a single React page or component implementing this specification
- production-ready enough for live workshop use
- readable and maintainable
- easy to adjust later
