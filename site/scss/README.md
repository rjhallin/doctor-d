# How To Use the SCSS Folder

This folder structure has been developed to allow Illumine8 developers to harness all the tools and advantages of modern front-end development while also keeping a logical and maintainable file structure.

## How It All Works

This whole folder puts out one CSS file. That's it. style.css is the entry point, which has multiple "@import" tags. These tags point the file to include other subfiles, allowing the codebase to be split up and each subfile be individually version-controlled.

The folder is structured in different sections, and loaded in a specific and intentional order.

### Variables

The \_variables.scss folder holds all the basic variables unique to a new web project. This includes color variables, fonts and font sizes, layout / grid options, "breakpoint" variables (see below), and other reusable values for use across subfiles.

The Variables are loaded first in the style.scss root file to allow their values to be registered before the other files use them for reference.

### Mixins

Mixins are similar to variables in that they don't actually style anything directly, but unique in that they take arguments and can produce entire blocks of code. Mixins are ideal for any often-reused bits of code, or functions that apply a mathematical function to produce an output. Here's how to use a mixin:
```scss
@include mixin_name

@include mixin_name(optional, parameters, here)

@include mixin_name(optional, parameters, here) {
  /* if your mixin includes a '@content' tag, markup within brackets
   will be rendered there. */
}
```

The most common application is the "breakpoint" mixin, which automatically renders @media tags from within a class declaration. For example:

```scss
// instead of this:

img {
  float: none;
  margin: 0 auto;
}

@media screen and (min-width:767px) {
  img {
    float: right:
    margin: initial;
  }
}

// you can write:

img {
  float: none;
  margin: 0 auto;
  @include breakpoint-md {
    float: right;
    margin: initial;
  }
}
```

And receive the same output.

### Base

The base files are the first to actually generate direct output in the style.css file. Included in this section is \_normalize.scss, which is a CSS reset (removes browser-default stylings to create a consistent starting point for markup), and \_generic.scss, which contains the basic typographic styles shared across all pages and modules on the site. If there are any additional files required for shared assets necessary on all pages, they go in this section.

### Modules

Modules are reusable bits of code that are reused throughout a site, but do not necessarily appear on every page. Examples include hero images, card components, menus, and full-width page elements just to name a few. Basically, if something appears the same way on every page, it belongs in the base, more than one page, a module, and on a single page, then a page file.

### Pages

Each page that has unique styles attached to it should have a file created as well. This file will be included both as its own file (because not every page needs these styles) and with the base style.css file for cacheing reasons.
