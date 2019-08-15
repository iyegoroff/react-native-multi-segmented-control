package iyegoroff.multisegmentedcontrol

import android.graphics.Color
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = MultiSegmentedControlManager.reactClass)
class MultiSegmentedControlManager : ViewGroupManager<MultiSegmentedControl>() {

  companion object {
    const val reactClass = "MSCMultiSegmentedControl"
  }

  override fun getName(): String {
    return reactClass
  }

  override fun createViewInstance(reactContext: ThemedReactContext): MultiSegmentedControl {
    return MultiSegmentedControl(reactContext)
  }

  @ReactProp(name = "values")
  fun setValues(view: MultiSegmentedControl, values: ReadableArray) {
    view.setValues(values)
  }

  @ReactProp(name = "selectedIndices")
  fun setSelectedIndices(view: MultiSegmentedControl, selectedIndices: ReadableArray) {
    view.setSelectedIndices(selectedIndices)
  }

  @ReactProp(name = "tintColor", customType = "Color", defaultInt = Color.BLUE)
  fun setTintColor(view: MultiSegmentedControl, tintColor: Int) {
    view.setTintColor(tintColor)
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  fun setEnabled(view: MultiSegmentedControl, enabled: Boolean) {
    view.isEnabled = enabled
  }

  @ReactProp(name = "isSingle")
  fun setIsSingle(view: MultiSegmentedControl, isSingle: Boolean) {
    view.setIsSingle(isSingle)
  }

  @ReactProp(name = "maxSelected")
  fun setMaxSelected(view: MultiSegmentedControl, maxSelected: Int) {
    view.setMaxSelected(maxSelected)
  }

  @ReactProp(name = "minSelected")
  fun setMinSelected(view: MultiSegmentedControl, minSelected: Int) {
    view.setMinSelected(minSelected)
  }

  @ReactProp(name = "dividerColor", customType = "Color", defaultInt = Color.GRAY)
  fun setDividerColor(view: MultiSegmentedControl, dividerColor: Int) {
    view.setDividerColor(dividerColor)
  }

  @ReactProp(name = "borderRadius")
  fun setBorderRadius(view: MultiSegmentedControl, borderRadius: Float) {
    view.setBorderRadius(borderRadius)
  }

  @ReactProp(name = "textStyle")
  fun setTextStyle(view: MultiSegmentedControl, textStyle: ReadableMap) {
    view.setTextStyle(textStyle)
  }

  @ReactProp(name = "selectedTextStyle")
  fun setSelectedTextStyle(view: MultiSegmentedControl, selectedTextStyle: ReadableMap) {
    view.setSelectedTextStyle(selectedTextStyle)
  }

  @ReactProp(name = "elevation")
  override fun setElevation(view: MultiSegmentedControl, elevation: Float) {
    view.setCardElevation(elevation)
  }
}