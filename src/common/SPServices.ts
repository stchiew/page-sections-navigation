import { IAnchorItem } from './model';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { DOMElement } from 'react';

// This is the element of anchor webpart
const _VIEWPORT: string = "data-viewport-id='WebPart.PageSectionsNavigationAnchorWebPart.external.";
export class SPService {

  public static async GetAnchorLinks(context: WebPartContext) {
    let anchorLinks: IAnchorItem[] = [];

    try {
      /* Page ID on which the web part is added */
      let pageId = context.pageContext.listItem.id;
      let _anchor: IAnchorItem = {};
      /* Get the canvasContent1 data for the page which consists of all the HTML */
      let data = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/sitepages/pages(${pageId})`, SPHttpClient.configurations.v1);
      let jsonData = await data.json();
      let canvasContent1 = jsonData.CanvasContent1;
      let canvasContent1JSON: any[] = JSON.parse(canvasContent1);
      canvasContent1JSON.map((webPart) => {
        if (webPart.webPartData != null) {
          if (webPart.webPartData.title === "Page Sections Navigation Anchor") {
            let uniqueId: string = webPart.webPartData.properties.uniqueId;
            let anchorTitle: string = webPart.webPartData.properties.title;
            let instanceId: string = webPart.webPartData.instanceId;
            let unikViewport: string = "div[" + _VIEWPORT + instanceId + "']";
            let el: HTMLElement = document.body.querySelector(unikViewport);
            _anchor.title = anchorTitle;
            _anchor.uniqueId = uniqueId;
            _anchor.domElement = el;
            anchorLinks.push({ title: anchorTitle, uniqueId: uniqueId, domElement: el });
          }
        }
      });

    } catch (error) {
      console.log(error);
    }

    return anchorLinks;
  }
}