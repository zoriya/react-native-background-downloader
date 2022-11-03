package com.eko;

import java.io.Serializable;

public class RNBGDTaskConfig implements Serializable {
    public String id;
    public String metadata;
    public boolean reportedBegin;

    public RNBGDTaskConfig(String id, String metadata) {
        this.id = id;
        this.metadata = metadata;
        this.reportedBegin = false;
    }
}
