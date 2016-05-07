package me.rei_m.fluxsample.event;

public class RxBusProvider {

    private static final RxBus BUS = new RxBus();

    private RxBusProvider() {
    }

    public static RxBus getInstance() {
        return BUS;
    }
}
