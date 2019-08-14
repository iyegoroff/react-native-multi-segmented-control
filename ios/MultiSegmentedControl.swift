import Foundation
import ATHMultiSelectionSegmentedControl

class MultiSegmentedControl: MultiSelectionSegmentedControl, MultiSelectionSegmentedControlDelegate {
  private var prevSelectedIndices: [Int] = []
  private var textAttrs: (UIFont, UIColor?)?
  private var selectedTextAttrs: (UIFont, UIColor?)?
  
  public init() {
    super.init(items: [])
    delegate = self
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }
  
  @objc var values: [String] = [] {
    didSet {
      insertSegmentsWithTitles(values)

      DispatchQueue.main.async {
        self.selectedSegmentIndices = self.selectedIndices
        self.updateButtons()
      }
    }
  }
  
  @objc var selectedIndices: [Int] = [] {
    didSet {
      selectedSegmentIndices = selectedIndices
      prevSelectedIndices = selectedIndices
      
      updateButtons()
      
      DispatchQueue.main.async {
        self.selectedSegmentIndices = self.selectedIndices
        self.updateButtons()
      }
    }
  }
  
  @objc func setBorderRadius(_ borderRadius: CGFloat) {
    cornerRadius = borderRadius
  }

  @objc func setSelectedTextStyle(_ style: Dictionary<String, NSObject>) {
    selectedTextAttrs = MultiSegmentedControl.textAttributes(style)
  }

  @objc func setTextStyle(_ style: Dictionary<String, NSObject>) {
    textAttrs = MultiSegmentedControl.textAttributes(style)
  }

  @objc var maxSelected: UInt = 0
  @objc var minSelected: UInt = 0
  @objc var isSingle: Bool = false
  @objc var hideDivider: Bool = false

  @objc var enabled: Bool = true {
    didSet {
      isUserInteractionEnabled = enabled
      self.alpha = enabled ? 1.0 : 0.5
    }
  }

  @objc var onChange: RCTBubblingEventBlock?
  
  func multiSelectionSegmentedControl(
    _ control: MultiSelectionSegmentedControl,
    selectedIndices indices: [Int]
  ) {
    let change = Set.init(indices).symmetricDifference(prevSelectedIndices)
    let selectedAmount = indices.count

    if let changedIndex = change.first, let cb = onChange {
      if (maxSelected != 0 && selectedAmount > maxSelected) {
        selectedIndices = indices.filter({ $0 != changedIndex })
        
        return
      }
      
      if (minSelected != 0 && selectedAmount < minSelected) {
        selectedIndices = indices + [changedIndex]
        
        return
      }
      
      if (isSingle && selectedAmount > 1) {
        selectedIndices = [changedIndex]

      } else {
        updateButtons()
      }
      
      cb([
        "selectedIndices": selectedSegmentIndices,
        "selectedValues": values.enumerated()
          .filter({ selectedSegmentIndices.contains($0.offset) })
          .map({ $0.element }),
        "changedIndex": changedIndex,
        "changedIndexSelected": selectedSegmentIndices.contains(changedIndex)
      ])
    }
    
    prevSelectedIndices = selectedSegmentIndices
  }
  
  private func updateButtons() {
    subviews.compactMap({ $0 as? UIButton }).enumerated().forEach { (index, button) in
      let selected = selectedIndices.contains(index)
      if let attrs = selected ? selectedTextAttrs : textAttrs, let label = button.titleLabel {
        label.font = attrs.0
        
        if let color = attrs.1 {
          button.setTitleColor(color, for: .normal)
        }
      }
      
      button.layer.borderWidth = hideDivider ? 0 : 0.5
    }
  }
  
  private static func textAttributes(_ style: Dictionary<String, NSObject>) -> (UIFont, UIColor?) {
    var fontSize: CGFloat = 16.0
    if let size = style["fontSize"] as? NSNumber {
      fontSize = CGFloat(size.floatValue)
    }
    
    var font = UIFont.systemFont(ofSize: fontSize)
    
    if let fontFamily = style["fontFamily"] as? String {
      font = UIFont.init(name: fontFamily, size: fontSize)!

    } else if "bold" == style["fontWeight"] as? String {
      font = UIFont.boldSystemFont(ofSize: fontSize)
      
    } else if "italic" == style["fontStyle"] as? String {
      font = UIFont.italicSystemFont(ofSize: fontSize)
    }
    
    if let color = style["color"] as? NSNumber {
      return (font, androidColor(color.intValue))
    } else {
      return (font, nil)
    }
  }
  
  private static func androidColor(_ c: Int) -> UIColor {
    return UIColor.init(red: CGFloat((c >> 16) & 0xFF) / 255.0,
                        green: CGFloat((c >> 8) & 0xFF) / 255.0,
                        blue: CGFloat(c & 0xFF) / 255.0,
                        alpha: CGFloat((c >> 24) & 0xFF) / 255.0)
  }
}
