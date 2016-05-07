package me.rei_m.fluxsample.event;

public class UpdateCountAction {

    private long count;

    public UpdateCountAction(long count) {
        this.count = count;
    }

    public long getCount() {
        return count;
    }
}
