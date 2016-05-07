package me.rei_m.fluxsample.store;

import me.rei_m.fluxsample.event.CountUpdated;
import me.rei_m.fluxsample.event.RxBusProvider;
import me.rei_m.fluxsample.event.UpdateCountAction;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;

public class CountStore {

    private long count;

    private Action1<Object> action;

    public CountStore() {
        this.count = 0;
        this.action = event -> {
            if (event instanceof UpdateCountAction) {
                onUpdateCount(((UpdateCountAction) event).getCount());
            }
        };
    }

    public long getCount() {
        return count;
    }

    public Subscription getSubscription() {
        return RxBusProvider.getInstance()
                .toObservable()
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(this.action);
    }

    private void onUpdateCount(long count) {
        this.count = count;
        RxBusProvider.getInstance().send(new CountUpdated());
    }
}
