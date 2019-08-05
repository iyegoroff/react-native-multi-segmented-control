package iyegoroff.multisegmentedcontrol;

import android.content.Context;
import android.graphics.Color;
import android.view.Gravity;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.UIManagerModule;
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

  public MultiSegmentedControl(Context context) {
    super(context);

    mToggleButtonLayout = new ToggleButtonLayout(context);
    mToggleButtonLayout.setCardBackgroundColor(Color.TRANSPARENT);
    mToggleButtonLayout.setMultipleSelection(true);
    mToggleButtonLayout.setLayoutParams(
      new LayoutParams(
        LayoutParams.MATCH_PARENT,
        LayoutParams.MATCH_PARENT,
        Gravity.CENTER_HORIZONTAL
      )
    );

    ReflectUtils.setFieldValue(mToggleButtonLayout, "mode", ToggleButtonLayout.MODE_EVEN);
    ReflectUtils.setFieldValue(mToggleButtonLayout, "layoutRes", R.layout.view_toggle_button);

    mToggleButtonLayout.setOnToggledListener(new Function3<ToggleButtonLayout, Toggle, Boolean, Unit>() {
      @Override
      public Unit invoke(ToggleButtonLayout toggleButtonLayout, Toggle toggle, Boolean selected) {
        int selectedAmount = toggleButtonLayout.selectedToggles().size();
        int id = toggle.getId();

        if (!mIsEnabled) {
          toggleButtonLayout.setToggled(id, !selected);

          return null;
        }

        if (mMaxSelected != 0 && selectedAmount > mMaxSelected) {
          toggleButtonLayout.setToggled(id, false);

          return null;
        }

        if (mMinSelected != 0 && selectedAmount < mMinSelected) {
          toggleButtonLayout.setToggled(id, true);

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

  private void reselect() {
    if (mSelectedIndices != null) {
      List<Toggle> toggles = mToggleButtonLayout.getToggles();

      for (int i = 0; i < toggles.size(); i++) {
        mToggleButtonLayout.setToggled(toggles.get(i).getId(), mSelectedIndices.contains(i));
      }
    }
  }

  public void setValues(ReadableArray values) {
    for (int i = 0; i < values.size(); i++) {
      mToggleButtonLayout.addToggle(new Toggle(i + 1, null, values.getString(i)));
    }

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
  }

  public void setEnabled(boolean enabled) {
    mIsEnabled = enabled;
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

    reselect();
  }

  public void setBorderRadius(float borderRadius) {
    mToggleButtonLayout.setRadius(PixelUtil.toPixelFromDIP(borderRadius));
  }
}
