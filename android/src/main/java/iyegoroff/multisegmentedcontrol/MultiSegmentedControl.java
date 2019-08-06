package iyegoroff.multisegmentedcontrol;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.text.ReactFontManager;
import com.savvyapps.togglebuttonlayout.Toggle;
import com.savvyapps.togglebuttonlayout.ToggleButtonLayout;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.reflectutils.ReflectUtils;
import kotlin.Unit;
import kotlin.jvm.functions.Function3;


public class MultiSegmentedControl extends FrameLayout {

  private @Nonnull ToggleButtonLayout mToggleButtonLayout;
  private boolean mValuesAreSet = false;
  private @Nullable Set<Integer> mSelectedIndices = null;
  private int mMaxSelected = 0;
  private int mMinSelected = 0;
  private boolean mIsSingle = false;
  private boolean mIsEnabled = true;
  private boolean mSelectedColorSet = false;
  private @Nullable Integer mBackgroundColor = null;
  private @Nullable Integer mTextColor = null;
  private @Nullable Integer mSelectedTextColor = null;
  private @Nullable Float mTextFontSize = null;
  private @Nullable Float mSelectedTextFontSize = null;
  private @Nullable String mTextFontWeight = null;
  private @Nullable String mSelectedTextFontWeight = null;
  private @Nullable String mTextFontFamily = null;
  private @Nullable String mSelectedTextFontFamily = null;
  private @Nullable String mTextFontStyle = null;
  private @Nullable String mSelectedTextFontStyle = null;

  public MultiSegmentedControl(Context context) {
    super(context);

    mToggleButtonLayout = new ToggleButtonLayout(context);
    mToggleButtonLayout.setMultipleSelection(true);
    mToggleButtonLayout.setCardElevation(0);
    mToggleButtonLayout.setLayoutParams(
      new LayoutParams(
        LayoutParams.MATCH_PARENT,
        LayoutParams.MATCH_PARENT,
        Gravity.CENTER_HORIZONTAL
      )
    );

    if (Build.VERSION.SDK_INT < 21) {
      mToggleButtonLayout.setRadius(0.0f);
    }

    ReflectUtils.setFieldValue(mToggleButtonLayout, "mode", ToggleButtonLayout.MODE_EVEN);
    ReflectUtils.setFieldValue(mToggleButtonLayout, "layoutRes", R.layout.view_toggle_button);

    mToggleButtonLayout.setOnToggledListener(new Function3<ToggleButtonLayout, Toggle, Boolean, Unit>() {
      @Override
      public Unit invoke(ToggleButtonLayout toggleButtonLayout, Toggle toggle, Boolean selected) {
        int selectedAmount = toggleButtonLayout.selectedToggles().size();
        int id = toggle.getId();

        if (!mIsEnabled) {
          toggleButtonLayout.setToggled(id, !selected);
          updateToggleViews();

          return null;
        }

        if (mMaxSelected != 0 && selectedAmount > mMaxSelected) {
          toggleButtonLayout.setToggled(id, false);
          updateToggleViews();

          return null;
        }

        if (mMinSelected != 0 && selectedAmount < mMinSelected) {
          toggleButtonLayout.setToggled(id, true);
          updateToggleViews();

          return null;
        }

        if (mIsSingle && selectedAmount > 1) {
          toggleButtonLayout.reset();
          toggleButtonLayout.setToggled(id, true);
        }

        if (mSelectedIndices != null) {
          if (selected) {
            mSelectedIndices.add(id);
          } else {
            mSelectedIndices.remove(id);
          }
        }

        updateToggleViews();

        int viewId = getId();

        ((ReactContext) getContext()).getNativeModule(UIManagerModule.class).getEventDispatcher()
          .dispatchEvent(
            new MultiSegmentedControlChangeEvent(
              viewId,
              id - 1,
              selected,
              toggleButtonLayout.selectedToggles()
            )
          );

        return null;
      }
    });

    addView(mToggleButtonLayout);
  }

  private void updateToggleViews() {
    List<Toggle> toggles = mToggleButtonLayout.getToggles();
    LinearLayout layout = ReflectUtils.getFieldValue(mToggleButtonLayout, "linearLayout");
    int textColor = mTextColor != null
      ? mTextColor
      : mSelectedColorSet
      ? mToggleButtonLayout.getSelectedColor()
      : Color.BLACK;
    int backgroundColor = mBackgroundColor != null ? mBackgroundColor : Color.WHITE;
    int selectedTextColor = mSelectedTextColor != null ? mSelectedTextColor : backgroundColor;
    int selectedBackgroundColor = mToggleButtonLayout.getSelectedColor();
    float textFontSize = mTextFontSize != null ? mTextFontSize : 16.0f;
    float selectedTextFontSize = mSelectedTextFontSize != null ? mSelectedTextFontSize : 16.0f;
    Typeface textTypeface = typeface(mTextFontFamily, mTextFontWeight, mTextFontStyle);
    Typeface selectedTextTypeface = typeface(mSelectedTextFontFamily, mSelectedTextFontWeight, mSelectedTextFontStyle);

    if (layout != null) {
      for (int i = 0; i < toggles.size(); i++) {
        Toggle toggle = toggles.get(i);
        View toggleView = layout.findViewById(toggle.getId());
        TextView textView = toggleView.findViewById(android.R.id.text1);

        if (toggle.isSelected()) {
          toggleView.setBackground(new ColorDrawable(selectedBackgroundColor));
          textView.setTextColor(selectedTextColor);
          textView.setTextSize(selectedTextFontSize);
          textView.setTypeface(selectedTextTypeface);

        } else {
          toggleView.setBackground(new ColorDrawable(backgroundColor));
          textView.setTextColor(textColor);
          textView.setTextSize(textFontSize);
          textView.setTypeface(textTypeface);
        }
      }
    }
  }

  private void updateToggleViewsLayouts() {
    List<Toggle> toggles = mToggleButtonLayout.getToggles();
    LinearLayout layout = ReflectUtils.getFieldValue(mToggleButtonLayout, "linearLayout");

    if (layout != null) {
      for (int i = 0; i < toggles.size(); i++) {
        Toggle toggle = toggles.get(i);
        TextView textView = layout.findViewById(toggle.getId()).findViewById(android.R.id.text1);
        textView.setLayoutParams(new LayoutParams(
          LayoutParams.MATCH_PARENT,
          LayoutParams.MATCH_PARENT
        ));
        textView.setGravity(Gravity.CENTER);
      }
    }
  }

  private Typeface typeface(String fontFamily, String fontWeight, String fontStyle) {
    return ReactFontManager.getInstance().getTypeface(
      fontFamily,
      ("bold".equals(fontWeight) ? Typeface.BOLD : Typeface.NORMAL) |
       ("italic".equals(fontStyle) ? Typeface.ITALIC : Typeface.NORMAL),
      getContext().getAssets()
    );
  }

  private void reselect() {
    if (mSelectedIndices != null) {
      List<Toggle> toggles = mToggleButtonLayout.getToggles();

      for (int i = 0; i < toggles.size(); i++) {
        mToggleButtonLayout.setToggled(toggles.get(i).getId(), mSelectedIndices.contains(i));
      }

      updateToggleViews();
    }
  }

  public void setValues(ReadableArray values) {
    for (int i = 0; i < values.size(); i++) {
      mToggleButtonLayout.addToggle(new Toggle(i + 1, null, values.getString(i)));
    }

    updateToggleViewsLayouts();

    mValuesAreSet = true;
    reselect();
  }

  public void setSelectedIndices(ReadableArray selectedIndices) {
    Set<Integer> selected = new HashSet<>();

    for (int i = 0; i < selectedIndices.size(); i++) {
      selected.add(selectedIndices.getInt(i));
    }

    mSelectedIndices = selected;

    if (mValuesAreSet) {
      reselect();
    }
  }

  public void setTintColor(int tintColor) {
    mToggleButtonLayout.setSelectedColor(tintColor);
    mSelectedColorSet = true;
  }

  public void setEnabled(boolean enabled) {
    mIsEnabled = enabled;

    List<Toggle> toggles = mToggleButtonLayout.getToggles();
    LinearLayout layout = ReflectUtils.getFieldValue(mToggleButtonLayout, "linearLayout");

    if (layout != null) {
      for (int i = 0; i < toggles.size(); i++) {
        Toggle toggle = toggles.get(i);
        View toggleView = layout.findViewById(toggle.getId());

        toggleView.setEnabled(enabled);
        toggleView.setClickable(enabled);
        toggleView.setAlpha(enabled ? 1.0f : 0.5f);
      }
    }
  }

  public void setIsSingle(boolean isSingle) {
    mIsSingle = isSingle;
  }

  public void setMaxSelected(int maxSelected) {
    mMaxSelected = maxSelected;
  }

  public void setMinSelected(int minSelected) {
    mMinSelected = minSelected;
  }

  public void setDividerColor(int dividerColor) {
    mToggleButtonLayout.setDividerColor(dividerColor);
    ReflectUtils.invokeMethod(mToggleButtonLayout, "resetTogglesIfNeeded");
    updateToggleViewsLayouts();

    reselect();
  }

  public void setBorderRadius(float borderRadius) {
    if (Build.VERSION.SDK_INT >= 21) {
      mToggleButtonLayout.setRadius(PixelUtil.toPixelFromDIP(borderRadius)); }
  }

  public void setBackgroundColor(int backgroundColor) {
    mBackgroundColor = backgroundColor;

    if (mValuesAreSet) {
      updateToggleViews();
    }
  }

  public void setTextStyle(ReadableMap style) {
    mTextColor = style.hasKey("color") ? style.getInt("color") : null;
    mTextFontFamily = style.hasKey("fontFamily") ? style.getString("fontFamily") : null;
    mTextFontSize = style.hasKey("fontSize") ? (float) style.getDouble("fontSize") : null;
    mTextFontWeight = style.hasKey("fontWeight") ? style.getString("fontWeight") : null;
    mTextFontStyle = style.hasKey("fontStyle") ? style.getString("fontStyle") : null;

    if (mValuesAreSet) {
      updateToggleViews();
    }
  }

  public void setSelectedTextStyle(ReadableMap style) {
    mSelectedTextColor = style.hasKey("color") ? style.getInt("color") : null;
    mSelectedTextFontFamily = style.hasKey("fontFamily") ? style.getString("fontFamily") : null;
    mSelectedTextFontSize = style.hasKey("fontSize") ? (float) style.getDouble("fontSize") : null;
    mSelectedTextFontWeight = style.hasKey("fontWeight") ? style.getString("fontWeight") : null;
    mSelectedTextFontStyle = style.hasKey("fontStyle") ? style.getString("fontStyle") : null;

    if (mValuesAreSet) {
      updateToggleViews();
    }
  }

  public void setCardElevation(float cardElevation) {
    float elevation = PixelUtil.toDIPFromPixel(cardElevation);
    mToggleButtonLayout.setMaxCardElevation(elevation);
    mToggleButtonLayout.setCardElevation(elevation);
  }
}
