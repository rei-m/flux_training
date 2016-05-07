package me.rei_m.fluxsample;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;

import butterknife.BindView;
import butterknife.ButterKnife;
import me.rei_m.fluxsample.action.CountActionCreator;
import me.rei_m.fluxsample.component.CountTextComponent;
import me.rei_m.fluxsample.event.CountUpdated;
import me.rei_m.fluxsample.event.RxBusProvider;
import me.rei_m.fluxsample.store.CountStore;
import rx.android.schedulers.AndroidSchedulers;
import rx.subscriptions.CompositeSubscription;

public class MainActivity extends AppCompatActivity {

    @BindView(R.id.activity_main_button)
    Button buttonCount;

    @BindView(R.id.activity_main_text_count)
    CountTextComponent textCount;

    private CompositeSubscription compositeSubscription;

    private CountStore countStore;

    private CountActionCreator countActionCreator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        countActionCreator = new CountActionCreator();

        countStore = new CountStore();

        buttonCount.setOnClickListener(v -> countActionCreator.updateCount(textCount.getCount() + 1));
    }

    @Override
    protected void onResume() {
        super.onResume();
        compositeSubscription = new CompositeSubscription();
        compositeSubscription.add(countStore.getSubscription());
        compositeSubscription.add(RxBusProvider.getInstance()
                .toObservable()
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(event -> {
                    if (event instanceof CountUpdated) {
                        textCount.onCountUpdated(countStore);
                    }
                })
        );
    }

    @Override
    protected void onPause() {
        super.onPause();
        compositeSubscription.unsubscribe();
    }
}
