import { getBrowsingSuggestions } from '@scripts/_utilities'
// Page Redirect
new class {
  selectedRegionCookie: string;
  $autoRedirect: HTMLElement | null;
  $regionData: HTMLElement | null;
  data: any;
  host: string;
  recommandRegionData: any;
  rootURL: string;

  constructor() {
    this.$autoRedirect = document.getElementById("as-auto-redirect");
    this.selectedRegionCookie = "selectedRegion"; //选中地区Cookie
    this.$regionData = document.querySelector(".as-regions-data"); // 所在国家json数据
    this.data = {}; // 存储解析后的数据
    this.host = window.location.host; // 当前网页所在服务器的主机名或域名
    this.recommandRegionData = {};
    this.rootURL = this.$autoRedirect?.dataset.rootUrl ?? '';

    this.handleMetaData();
    this.init()
  }

  async init() {
    const userIp = await this.getUserIp();
    if (userIp) {
      // 记录用户ip信息，用于控制页脚国家/地区内容等
      this.$autoRedirect && (this.$autoRedirect.dataset.userIp = userIp);
    } else {
      this.updateRedirectFlag();
      return;
    }

    // 只要IP是马来西亚或者印度尼西亚，则强制跳转至马来西亚站或者印度尼西亚站
    if (userIp && userIp.toLowerCase() === "my" || userIp.toLowerCase() === "id") {
      this.forceRedirect(userIp)
      return
    }

    const selectedRegionCookie = this.getCookie(this.selectedRegionCookie);
    if (selectedRegionCookie) {
      // 已记录cookie
      this.processSelectedRedirect(selectedRegionCookie);
    } else {
      if (userIp) {
        this.getReconmand(userIp);
  
        // 检查是否需要强制跳转
        this.checkForceRedirect();
      }
    }
  }

  updateRedirectFlag () {
    this.$autoRedirect && (this.$autoRedirect.dataset.redirect = 'no');
  }

  // 当用户IP为MY或者ID地区，则跳转至马来西亚站或者印度尼西亚站
  forceRedirect (targetIsoCode: string) {
    const rootURL = this.rootURL;
    const storeInfo = this.data.regions.find((item: { isoCode: string; }) => item.isoCode.toLowerCase() === targetIsoCode.toLowerCase())
    if (storeInfo && storeInfo.websiteUrl) {
      const storeURL = new URL(storeInfo.websiteUrl)
      if (storeURL.host !== this.host) {
        let originalOrigin = window.location.origin;
        if (rootURL !== '/') {
          originalOrigin = originalOrigin + rootURL;
        }
        // 强制跳转时避免URL将/fr、/de等小域名带上
        const targetLink = new URL(window.location.href.replace(originalOrigin, storeInfo?.websiteUrl.trim()));
        // targetLink.pathname = storeURL.pathname;
        window.location.replace(targetLink.href);
        return;
      } else {
        this.updateRedirectFlag();
      }
    }
  }

  //处理元数据，依次解析地区数据、区域数据、语言数据、样式等
  handleMetaData() {
    this.data.regions = this.$regionData && JSON.parse(this.$regionData.innerHTML);
  }

  processSelectedRedirect(selectedRegionCookie: string) {
    const rootURL = this.rootURL;
    const originalHref = window.location.href;

    // 强制跳转回之前cookie选择的国家/地区
    const previousStoreInfo = this.data.regions.find((item: { isoCode: string; }) => item.isoCode === selectedRegionCookie);
    if (previousStoreInfo && previousStoreInfo.websiteUrl) {
      const previousStoreWebsiteUrl = previousStoreInfo.websiteUrl.trim();
      const previousStoreURL = new URL(previousStoreWebsiteUrl);
      let originalOrigin = window.location.origin;
      if (rootURL !== '/') {
        originalOrigin = originalOrigin + rootURL;
      }

      if (previousStoreURL.host !== this.host) {
        // 匹配到目标区域，跳转至不同站
        const targetLink = new URL(originalHref.replace(originalOrigin, previousStoreWebsiteUrl));
        // targetLink.pathname = previousStoreURL.pathname;
        window.location.replace(targetLink.href);
        return;
      } else {
        if (originalOrigin !== previousStoreWebsiteUrl) {
          // 匹配到目标区域有相应语种
          const targetLink = originalHref.replaceAll(originalOrigin, previousStoreWebsiteUrl);
          window.location.replace(targetLink);
          return;
        }
      }
    }
    
    // 记录页面没有强制跳转
    this.updateRedirectFlag();
  }

  // 强制跳转，具体逻辑见：https://www.notion.so/fastlane-wiki/9bed7eb1d82543b6833feba1a19ef684
  checkForceRedirect() {
    if (!this.recommandRegionData || !this.recommandRegionData.websiteUrl) return;

    const recommendStoreURL = new URL(this.recommandRegionData.websiteUrl.trim());
    const rootURL = this.rootURL;
    const originalHref = window.location.href;

    if (rootURL === '/') {
      if (recommendStoreURL.host === this.host && Shopify?.locale.toLowerCase() !== this.recommandRegionData?.languageIsoCode.toLowerCase()) {
        // 匹配到目标区域有相应语种，跳转至同一个站跳转url中的pathname等都不变化
        const targetLink = originalHref.replaceAll(window.location.origin, this.recommandRegionData?.websiteUrl)
        window.location.replace(targetLink);
        return;
      }
    }

    // 记录页面没有强制跳转
    this.updateRedirectFlag();
  }

  // 获取用户当前IP所处位置
  async getUserIp () {
    try {
      let response = this.getCookie('ip_data')
      if (!response) {
        response = await getBrowsingSuggestions()
        if (response) {
          this.setCookie('ip_data', JSON.stringify(response))
        }
      } else {
        response = JSON.parse(response)
      }
      return response && response.detected_values && response.detected_values.country && response.detected_values.country.handle;
    } catch (error) {
      return null;
    }
  }

  getCookie(name: string) {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    if (match) {
      return match[2]
    }
    return null
  }

  setCookie(name: string, value: string) {
    if (document.domain.split(".").slice(-2).join(".") !== "myshopify.com") {
      document.cookie = `${name}=${value};path=/;domain=${document.domain.split(".").slice(-2).join(".")}`;
    } else {
      document.cookie = `${name}=${value};path=/`;
    }
  }

  getReconmand(userIp: string) {
    // 判断用户ip与列表地区的哪一个国家的isoCode匹配，即找到用户所在国家
    let targetRegions = this.data.regions.filter((item: { isoCode: string; }) => item.isoCode === userIp);
    // 默认推荐的地区，即"Other Regions"
    let defaultRegion = this.data.regions.find((item: { isRecommended: boolean; }) => item.isRecommended);
    // 存储地区为默认地区或用户所在地区
    targetRegions.length > 0 ? this.recommandRegionData = targetRegions[0] : defaultRegion && (this.recommandRegionData = defaultRegion);
  }
}()