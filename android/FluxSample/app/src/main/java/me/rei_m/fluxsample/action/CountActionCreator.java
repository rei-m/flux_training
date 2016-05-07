package me.rei_m.fluxsample.action;

import me.rei_m.fluxsample.event.RxBusProvider;
import me.rei_m.fluxsample.event.UpdateCountAction;

public class CountActionCreator {

    public void updateCount(long count) {
        RxBusProvider.getInstance().send(new UpdateCountAction(count));
    }
}
