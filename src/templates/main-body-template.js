import { html } from 'lit-element';

// Templates
import expandedEndpointTemplate from './expanded-endpoint-template';
import focusedEndpointTemplate from './focused-endpoint-template';
import overviewTemplate from './overview-template';
import endpointTemplate from './endpoint-template';
import serverTemplate from './server-template';
import securitySchemeTemplate from './security-scheme-template';
import navbarTemplate from './navbar-template';
import advancedSearchTemplate from './advance-search-template';
import SetTheme from '../utils/theme';
import { isValidHexColor } from '../utils/color-utils';

export default function mainBodyTemplate() {
  if (!this.resolvedSpec) {
    return;
  }
  const newTheme = {
    bg1: isValidHexColor(this.bgColor) ? this.bgColor : '',
    fg1: isValidHexColor(this.textColor) ? this.textColor : '',
    headerColor: isValidHexColor(this.headerColor) ? this.headerColor : '',
    primaryColor: isValidHexColor(this.primaryColor) ? this.primaryColor : '',
    navBgColor: isValidHexColor(this.navBgColor) ? this.navBgColor : '',
    navTextColor: isValidHexColor(this.navTextColor) ? this.navTextColor : '',
    navHoverBgColor: isValidHexColor(this.navHoverBgColor) ? this.navHoverBgColor : '',
    navHoverTextColor: isValidHexColor(this.navHoverTextColor) ? this.navHoverTextColor : '',
    navAccentColor: isValidHexColor(this.navAccentColor) ? this.navAccentColor : '',
  };

  /* eslint-disable indent */
  return html`
    ${this.theme === 'dark' ? SetTheme.call(this, 'dark', newTheme, this.disableDefaultColors) : SetTheme.call(this, 'light', newTheme, this.disableDefaultColors)}
    
    <!-- Advanced Search -->
    ${this.allowAdvancedSearch === 'false' ? '' : advancedSearchTemplate.call(this)}

    <div id='the-main-body' class="body">
      <!-- Side Nav -->
      ${((this.renderStyle === 'read' || this.renderStyle === 'focused')
          && this.showSideNav === 'true'
          && this.resolvedSpec
        ) ? navbarTemplate.call(this) : ''
      }

      <!-- Main Content -->
      <main class="main-content regular-font" part="section-main-content">
        <slot></slot>
        <div class="main-content-inner--${this.renderStyle}-mode">
          ${this.loading === true
            ? html`<div class="loader"></div>`
            : html`
              ${this.loadFailed === true
                ? html`<div style="text-align: center;margin: 16px;"> Unable to load the Spec</div>`
                : html`
                  <div class="operations-root" @click="${(e) => { this.handleHref(e); }}">
                  ${this.renderStyle === 'focused'
                    ? html`${focusedEndpointTemplate.call(this)}`
                    : html`
                      ${this.showInfo === 'true' ? overviewTemplate.call(this) : ''}
                      ${this.allowServerSelection === 'true' ? serverTemplate.call(this) : ''}
                      ${this.allowAuthentication === 'true' ? securitySchemeTemplate.call(this) : ''}
                      ${this.renderStyle === 'read'
                        ? expandedEndpointTemplate.call(this)
                        : endpointTemplate.call(this)
                      }
                    `
                  }
                  </div>
                `
              }`
          }
        </div>
        <slot name="footer"></slot>
      </main>
    </div>  
  `;
}
/* eslint-enable indent */
