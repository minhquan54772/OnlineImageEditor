package com.intern.imageEditor.payload.request;

public class ApplyFilterRequest {
    private String filterName;
    private String fileName;

    public ApplyFilterRequest() {
    }

    public ApplyFilterRequest(String filterName, String fileName) {
        this.filterName = filterName;
        this.fileName = fileName;
    }

    public String getFilterName() {
        return filterName;
    }

    public void setFilterName(String filterName) {
        this.filterName = filterName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
