package iyegoroff.multisegmentedcontrol;

import android.graphics.Color;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nonnull;

@ReactModule(name = MultiSegmentedControlManager.REACT_CLASS)
public class MultiSegmentedControlManager extends ViewGroupManager<MultiSegmentedControl> {

  static final String REACT_CLASS = "MSCMultiSegmentedControl";

  @Override
  public @Nonnull String getName() {
    return REACT_CLASS;
  }

  @Override
  public @Nonnull MultiSegmentedControl createViewInstance(@Nonnull ThemedReactContext reactContext) {
    return new MultiSegmentedControl(reactContext);
  }

  @ReactProp(name = "values")
  public void setValues(MultiSegmentedControl view, ReadableArray values) {
    view.setValues(values);
  }

  @ReactProp(name = "selectedIndices")
  public void setSelectedIndices(MultiSegmentedControl view, ReadableArray selectedIndices) {
    view.setSelectedIndices(selectedIndices);
  }

  @ReactProp(name = "tintColor", customType = "Color", defaultInt = Color.BLUE)
  public void setTintColor(MultiSegmentedControl view, int tintColor) {
    view.setTintColor(tintColor);
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  public void setEnabled(MultiSegmentedControl view, boolean enabled) {
    view.setEnabled(enabled);
  }

  @ReactProp(name = "isSingle")
  public void setIsSingle(MultiSegmentedControl view, boolean isSingle) {
    view.setIsSingle(isSingle);
  }

  @ReactProp(name = "maxSelected")
  public void setMaxSelected(MultiSegmentedControl view, int maxSelected) {
    view.setMaxSelected(maxSelected);
  }

  @ReactProp(name = "minSelected")
  public void setMinSelected(MultiSegmentedControl view, int minSelected) {
    view.setMinSelected(minSelected);
  }

  @ReactProp(name = "dividerColor", customType = "Color", defaultInt = Color.GRAY)
  public void setDividerColor(MultiSegmentedControl view, int dividerColor) {
    view.setDividerColor(dividerColor);
  }

  @ReactProp(name = "borderRadius")
  public void setBorderRadius(MultiSegmentedControl view, float borderRadius) {
    view.setBorderRadius(borderRadius);
  }

  @ReactProp(name = "textStyle")
  public void setTextStyle(MultiSegmentedControl view, ReadableMap textStyle) {
    view.setTextStyle(textStyle);
  }

  @ReactProp(name = "selectedTextStyle")
  public void setSelectedTextStyle(MultiSegmentedControl view, ReadableMap selectedTextStyle) {
    view.setSelectedTextStyle(selectedTextStyle);
  }

  @ReactProp(name = "elevation")
  public void setElevation(@Nonnull MultiSegmentedControl view, float elevation) {
    view.setCardElevation(elevation);
  }
}
