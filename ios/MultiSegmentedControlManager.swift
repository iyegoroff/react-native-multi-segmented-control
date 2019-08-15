import Foundation

@objc (MSCMultiSegmentedControlManager)
class MultiSegmentedControlManager : RCTViewManager {

  override func view() -> UIView! {
    return MultiSegmentedControl()
  }
}
