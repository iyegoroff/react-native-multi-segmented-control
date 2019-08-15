package iyegoroff.multisegmentedcontrol

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.views.text.ReactFontManager
import com.savvyapps.togglebuttonlayout.Toggle
import com.savvyapps.togglebuttonlayout.ToggleButtonLayout
import iyegoroff.reflectutils.ReflectUtils
import java.util.HashSet

class MultiSegmentedControl(context: Context) : FrameLayout(context) {

  private var valuesAreSet = false
  private var selectedIndices: MutableSet<Int>? = null
  private var maxSelected = 0
  private var minSelected = 0
  private var enabled = true
  private var isSingle = false
  private var selectedColorSet = false
  private var backgroundColor: Int? = null
  private var textColor: Int? = null
  private var selectedTextColor: Int? = null
  private var textFontSize: Float? = null
  private var selectedTextFontSize: Float? = null
  private var textFontWeight: String? = null
  private var selectedTextFontWeight: String? = null
  private var textFontFamily: String? = null
  private var selectedTextFontFamily: String? = null
  private var textFontStyle: String? = null
  private var selectedTextFontStyle: String? = null
  private val toggleButtonLayout = ToggleButtonLayout(context)

  init {
    toggleButtonLayout.multipleSelection = true
    toggleButtonLayout.layoutParams = LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT,
      Gravity.CENTER
    )

    if (Build.VERSION.SDK_INT < 21) {
      toggleButtonLayout.radius = 0.0f
    }

    ReflectUtils.setFieldValue(toggleButtonLayout, "mode", ToggleButtonLayout.MODE_EVEN)
    ReflectUtils.setFieldValue(toggleButtonLayout, "layoutRes", R.layout.view_toggle_button)

    toggleButtonLayout.onToggledListener = fun(
      toggleButtonLayout: ToggleButtonLayout,
      toggle: Toggle,
      selected: Boolean
    ) {
      val selectedAmount = toggleButtonLayout.selectedToggles().size
      val id = toggle.id

      if (!isEnabled) {
        toggleButtonLayout.setToggled(id, (!selected))
        updateToggleViews()

        return
      }

      if (maxSelected != 0 && selectedAmount > maxSelected) {
        toggleButtonLayout.setToggled(id, false)
        updateToggleViews()

        return
      }

      if (minSelected != 0 && selectedAmount < minSelected) {
        toggleButtonLayout.setToggled(id, true)
        updateToggleViews()

        return
      }

      if (isSingle && selectedAmount > 1) {
        toggleButtonLayout.reset()
        toggleButtonLayout.setToggled(id, true)
      }

      if (selected) {
        selectedIndices?.add(id)
      } else {
        selectedIndices?.remove(id)
      }

      updateToggleViews()

      val viewId = getId()

      (getContext() as ReactContext).getNativeModule(UIManagerModule::class.java).eventDispatcher
        .dispatchEvent(
          MultiSegmentedControlChangeEvent(
            viewId,
            id - 1,
            selected,
            toggleButtonLayout.selectedToggles()
          )
        )

      return
    }

    addView(toggleButtonLayout)
  }

  private fun updateToggleViews() {
    val toggles = toggleButtonLayout.toggles
    val layout = ReflectUtils.getFieldValue<LinearLayout>(toggleButtonLayout, "linearLayout")
    val textColor = textColor ?: (if (selectedColorSet) toggleButtonLayout.selectedColor else Color.BLACK)
    val backgroundColor = backgroundColor ?: Color.WHITE
    val selectedTextColor = selectedTextColor ?: backgroundColor
    val selectedBackgroundColor = toggleButtonLayout.selectedColor
    val textFontSize = textFontSize ?: 16.0f
    val selectedTextFontSize = selectedTextFontSize ?: 16.0f
    val textTypeface = typeface(textFontFamily, textFontWeight, textFontStyle)
    val selectedTextTypeface = typeface(selectedTextFontFamily, selectedTextFontWeight, selectedTextFontStyle)

    if (layout != null) {
      for (i in toggles.indices) {
        val toggle = toggles[i]
        val toggleView = layout.findViewById<View>(toggle.id)
        val textView = toggleView.findViewById<TextView>(android.R.id.text1)

        if (toggle.isSelected) {
          toggleView.background = ColorDrawable(selectedBackgroundColor)
          textView.setTextColor(selectedTextColor)
          textView.textSize = selectedTextFontSize
          textView.typeface = selectedTextTypeface

        } else {
          toggleView.background = ColorDrawable(backgroundColor)
          textView.setTextColor(textColor)
          textView.textSize = textFontSize
          textView.typeface = textTypeface
        }
      }
    }
  }

  private fun updateToggleViewsLayouts() {
    val toggles = toggleButtonLayout.toggles
    val layout = ReflectUtils.getFieldValue<LinearLayout>(toggleButtonLayout, "linearLayout")

    if (layout != null) {
      for (i in toggles.indices) {
        val toggle = toggles[i]
        val textView = layout.findViewById<View>(toggle.id).findViewById<TextView>(android.R.id.text1)
        textView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        textView.gravity = Gravity.CENTER
      }
    }
  }

  private fun typeface(fontFamily: String?, fontWeight: String?, fontStyle: String?): Typeface? {
    return ReactFontManager.getInstance().getTypeface(
      fontFamily,
      (if ("bold" == fontWeight) Typeface.BOLD else Typeface.NORMAL) or
        if ("italic" == fontStyle) Typeface.ITALIC else Typeface.NORMAL,
      context.assets
    )
  }

  private fun reselect() {
    if (selectedIndices != null) {
      val toggles = toggleButtonLayout.toggles

      for (i in toggles.indices) {
        toggleButtonLayout.setToggled(toggles[i].id, selectedIndices!!.contains(i))
      }

      updateToggleViews()
    }

    isEnabled = enabled
  }

  fun setValues(values: ReadableArray) {
    for (i in 0 until values.size()) {
      toggleButtonLayout.addToggle(Toggle(i + 1, null, values.getString(i)))
    }

    updateToggleViewsLayouts()

    valuesAreSet = true
    reselect()
  }

  fun setSelectedIndices(selectedIndices: ReadableArray) {
    val selected = HashSet<Int>()

    for (i in 0 until selectedIndices.size()) {
      selected.add(selectedIndices.getInt(i))
    }

    this.selectedIndices = selected

    if (valuesAreSet) {
      reselect()
    }
  }

  fun setTintColor(tintColor: Int) {
    toggleButtonLayout.selectedColor = tintColor
    selectedColorSet = true
  }

  override fun isEnabled(): Boolean {
    return enabled
  }

  override fun setEnabled(enabled: Boolean) {
    this.enabled = enabled

    val toggles = toggleButtonLayout.toggles
    val layout = ReflectUtils.getFieldValue<LinearLayout>(toggleButtonLayout, "linearLayout")

    if (layout != null) {
      for (i in toggles.indices) {
        val toggle = toggles[i]
        val toggleView = layout.findViewById<View>(toggle.id)

        toggleView.isEnabled = enabled
        toggleView.isClickable = enabled
        toggleView.alpha = if (enabled) 1.0f else 0.5f
      }
    }
  }

  fun setIsSingle(isSingle: Boolean) {
    this.isSingle = isSingle
  }

  fun setMaxSelected(maxSelected: Int) {
    this.maxSelected = maxSelected
  }

  fun setMinSelected(minSelected: Int) {
    this.minSelected = minSelected
  }

  fun setDividerColor(dividerColor: Int) {
    toggleButtonLayout.dividerColor = dividerColor
    ReflectUtils.invokeMethod<Unit>(toggleButtonLayout, "resetTogglesIfNeeded")
    updateToggleViewsLayouts()

    reselect()
  }

  fun setBorderRadius(borderRadius: Float) {
    if (Build.VERSION.SDK_INT >= 21) {
      toggleButtonLayout.radius = PixelUtil.toPixelFromDIP(borderRadius)
    }
  }

  override fun setBackgroundColor(backgroundColor: Int) {
    this.backgroundColor = backgroundColor

    if (valuesAreSet) {
      updateToggleViews()
    }
  }

  fun setTextStyle(style: ReadableMap) {
    textColor = if (style.hasKey("color")) style.getInt("color") else null
    textFontFamily = if (style.hasKey("fontFamily")) style.getString("fontFamily") else null
    textFontSize = if (style.hasKey("fontSize")) style.getDouble("fontSize").toFloat() else null
    textFontWeight = if (style.hasKey("fontWeight")) style.getString("fontWeight") else null
    textFontStyle = if (style.hasKey("fontStyle")) style.getString("fontStyle") else null

    if (valuesAreSet) {
      updateToggleViews()
    }
  }

  fun setSelectedTextStyle(style: ReadableMap) {
    selectedTextColor = if (style.hasKey("color")) style.getInt("color") else null
    selectedTextFontFamily = if (style.hasKey("fontFamily")) style.getString("fontFamily") else null
    selectedTextFontSize = if (style.hasKey("fontSize")) style.getDouble("fontSize").toFloat() else null
    selectedTextFontWeight = if (style.hasKey("fontWeight")) style.getString("fontWeight") else null
    selectedTextFontStyle = if (style.hasKey("fontStyle")) style.getString("fontStyle") else null

    if (valuesAreSet) {
      updateToggleViews()
    }
  }

  fun setCardElevation(cardElevation: Float) {
    val elevation = PixelUtil.toDIPFromPixel(cardElevation)
    toggleButtonLayout.maxCardElevation = elevation
    toggleButtonLayout.cardElevation = elevation
  }
}
