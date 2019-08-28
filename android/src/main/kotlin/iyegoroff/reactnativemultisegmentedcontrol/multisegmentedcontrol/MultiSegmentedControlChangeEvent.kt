package iyegoroff.reactnativemultisegmentedcontrol.multisegmentedcontrol

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.savvyapps.togglebuttonlayout.Toggle

class MultiSegmentedControlChangeEvent(
  viewId: Int,
  private val changedIndex: Int,
  private val changedIndexSelected: Boolean,
  selectedToggles: List<Toggle>
) : Event<MultiSegmentedControlChangeEvent>(viewId) {

  private val selectedIndices = Arguments.createArray()
  private val selectedValues = Arguments.createArray()

  init {
    for (i in selectedToggles.indices) {
      val title = selectedToggles[i].title
      val id = selectedToggles[i].id - 1
      selectedIndices.pushInt(id)
      selectedValues.pushString(title?.toString() ?: "")
    }
  }

  override fun getEventName(): String {
    return "topChange"
  }

  override fun dispatch(rctEventEmitter: RCTEventEmitter?) {
    rctEventEmitter?.receiveEvent(viewTag, eventName, serializeEventData())
  }

  private fun serializeEventData(): WritableMap {
    val eventData = Arguments.createMap()
    eventData.putInt("target", viewTag)
    eventData.putInt("changedIndex", changedIndex)
    eventData.putBoolean("changedIndexSelected", changedIndexSelected)
    eventData.putArray("selectedIndices", selectedIndices)
    eventData.putArray("selectedValues", selectedValues)

    return eventData
  }
}
