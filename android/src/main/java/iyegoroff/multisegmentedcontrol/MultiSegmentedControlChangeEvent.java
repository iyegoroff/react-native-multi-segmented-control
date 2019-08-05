package iyegoroff.multisegmentedcontrol;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.savvyapps.togglebuttonlayout.Toggle;

import java.util.List;

public class MultiSegmentedControlChangeEvent extends Event<MultiSegmentedControlChangeEvent> {

  private static final String EVENT_NAME = "topChange";

  private final int mChangedIndex;
  private final boolean mChangedIndexSelected;
  private final WritableArray mSelectedIndices;
  private final WritableArray mSelectedValues;

  MultiSegmentedControlChangeEvent(
    int viewId,
    int changedIndex,
    boolean changedIndexSelected,
    List<Toggle> selectedToggles
  ) {
    super(viewId);

    mChangedIndex = changedIndex;
    mChangedIndexSelected = changedIndexSelected;
    mSelectedIndices = Arguments.createArray();
    mSelectedValues = Arguments.createArray();

    for (int i = 0; i < selectedToggles.size(); i++) {
      CharSequence title = selectedToggles.get(i).getTitle();
      int id = selectedToggles.get(i).getId() - 1;
      mSelectedIndices.pushInt(id);
      mSelectedValues.pushString(title != null ? title.toString() : "");
    }
  }

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = Arguments.createMap();
    eventData.putInt("target", getViewTag());
    eventData.putInt("changedIndex", mChangedIndex);
    eventData.putBoolean("changedIndexSelected", mChangedIndexSelected);
    eventData.putArray("selectedIndices", mSelectedIndices);
    eventData.putArray("selectedValues", mSelectedValues);

    return eventData;
  }
}