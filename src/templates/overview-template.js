import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getSanitizedEmail, getSanitizedUrl, toMarkdown } from '../utils/common-utils';
import { getI18nText } from '../languages/index.js';

/* eslint-disable indent */
export default function overviewTemplate() {
  return html`
    <section id="overview" part="section-overview"
      class="observe-me ${this.renderStyle === 'focused' ? 'section-gap--focused-mode' : 'section-gap'}">
      ${this.resolvedSpec && this.resolvedSpec.info
        ? html`
          <slot name="overview-header"></slot>
          <slot name="overview">
            <div id="api-title" part="label-overview-title" style="font-size:32px;" class="section-padding">
              ${this.resolvedSpec.info.title}
              ${!this.resolvedSpec.info.version ? '' : html`
                <span style = 'font-size:var(--font-size-small);font-weight:bold'>
                  ${this.resolvedSpec.info.version}
                </span>`
              }
            </div>
            <div id="api-info" style="font-size:calc(var(--font-size-regular) - 1px); margin-top:8px;" class="section-padding">
              ${this.resolvedSpec.info.contact && this.resolvedSpec.info.contact.email
                ? html`<span>${this.resolvedSpec.info.contact.name || getI18nText('overview.email')}: 
                  <a href="mailto:${getSanitizedEmail(this.resolvedSpec.info.contact.email)}" part="anchor anchor-overview">${this.resolvedSpec.info.contact.email}</a>
                </span>`
                : ''
              }
              ${this.resolvedSpec.info.contact && this.resolvedSpec.info.contact.url
                ? html`<span>URL: <a href="${getSanitizedUrl(this.resolvedSpec.info.contact.url)}" part="anchor anchor-overview">${this.resolvedSpec.info.contact.url}</a></span>`
                : ''
              }
              ${this.resolvedSpec.info.license
                ? html`<span>License: 
                  ${this.resolvedSpec.info.license.url
                  ? html`<a href="${getSanitizedUrl(this.resolvedSpec.info.license.url)}" part="anchor anchor-overview">${this.resolvedSpec.info.license.name}</a>`
                  : this.resolvedSpec.info.license.name
                } </span>`
                : ''
              }
              ${this.resolvedSpec.info.termsOfService
                ? html`<span><a href="${getSanitizedUrl(this.resolvedSpec.info.termsOfService)}" part="anchor anchor-overview">${getI18nText('overview.terms-of-service')}</a></span>`
                : ''
              }
            </div>
          </slot>
          <slot name="overview-body"></slot>
          <slot name="overview-api-description">
            ${this.resolvedSpec.info.description
              ? html`${unsafeHTML(`<div class="m-markdown regular-font section-padding">${toMarkdown(this.resolvedSpec.info.description)}</div>`)}`
              : ''
            }
          </slot>
          <slot name="overview-footer"></slot>
        `
        : ''
      }
    </section>
  `;
}
/* eslint-enable indent */
