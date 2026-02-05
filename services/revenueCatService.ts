
import { Purchases } from "@revenuecat/purchases-js";

/**
 * REVENUECAT WEB SDK CONFIGURATION
 * 
 * IMPORTANT: To use RevenueCat on the web, you must create a "Web Billing" app 
 * in your RevenueCat dashboard and use the "Web Billing API Key".
 * It should start with 'rc_web_'.
 */
const REVENUECAT_API_KEY = "rc_web_placeholder_nestegg_irl"; 
const ENTITLEMENT_ID = "nestegg_plus";

class RevenueCatService {
  private purchases: typeof Purchases | null = null;
  private initialized = false;

  public async init(appUserId?: string) {
    if (this.initialized) return;
    
    try {
      // The @revenuecat/purchases-js SDK strictly validates the key format.
      // It must be a Web Billing key (starts with rc_web_)
      this.purchases = Purchases.configure(REVENUECAT_API_KEY, appUserId || "guest_user");
      this.initialized = true;
      console.log("RevenueCat configured successfully");
    } catch (e: any) {
      console.warn("RevenueCat Initialization Warning: ", e.message);
      // We do not throw here to allow the app to function in 'free' mode
      // if the billing configuration is missing or invalid.
    }
  }

  public async getOfferings() {
    if (!this.initialized) {
      console.warn("RevenueCat not initialized. Returning null offerings.");
      return null;
    }
    try {
      return await Purchases.getOfferings();
    } catch (e) {
      console.error("Error fetching offerings:", e);
      return null;
    }
  }

  public async checkEntitlementStatus(): Promise<boolean> {
    if (!this.initialized) return false;
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    } catch (e) {
      console.error("Error checking entitlements:", e);
      return false;
    }
  }

  public async purchasePackage(pkg: any): Promise<boolean> {
    if (!this.initialized) {
      alert("Billing system not initialized. Please ensure you have configured a valid RevenueCat Web Billing API key (starting with rc_web_).");
      return false;
    }
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    } catch (e) {
      console.error("Purchase failed:", e);
      return false;
    }
  }

  public async restorePurchases(): Promise<boolean> {
    if (!this.initialized) return false;
    try {
      const customerInfo = await Purchases.restorePurchases();
      return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    } catch (e) {
      console.error("Restore failed:", e);
      return false;
    }
  }
}

export const revenueCat = new RevenueCatService();
