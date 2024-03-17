package com.intern.imageEditor.models;

public class ImageFilter {
    private String name;

    private String displayName;

    private boolean purchaseRequired;


    public ImageFilter(String name, String displayName, boolean purchaseRequired) {
        this.name = name;
        this.displayName = displayName;
        this.purchaseRequired = purchaseRequired;
    }

    public ImageFilter() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean isPurchaseRequired() {
        return purchaseRequired;
    }

    public void setPurchaseRequired(boolean purchaseRequired) {
        this.purchaseRequired = purchaseRequired;
    }
}
