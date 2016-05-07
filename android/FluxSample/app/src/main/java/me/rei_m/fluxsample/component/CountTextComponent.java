package me.rei_m.fluxsample.component;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TextView;

import me.rei_m.fluxsample.store.CountStore;

public class CountTextComponent extends TextView {

    private long count;

    public long getCount() {
        return count;
    }

    public CountTextComponent(Context context) {
        super(context);
        initialize();
    }

    public CountTextComponent(Context context, AttributeSet attrs) {
        super(context, attrs);
        initialize();
    }

    public CountTextComponent(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initialize();
    }

    private void initialize() {
        this.count = 0;
    }

    public void onCountUpdated(CountStore countStore) {
        this.count = countStore.getCount();
        setText(String.valueOf(this.count));
    }
}
