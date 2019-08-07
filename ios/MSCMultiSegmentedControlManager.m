#import "MSCMultiSegmentedControlManager.h"
#import "MSCMultiSegmentedControl.h"

@implementation MSCMultiSegmentedControlManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[MSCMultiSegmentedControl alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(values, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(selectedIndices, NSArray<NSNumber *>)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(momentary, BOOL)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(hideSeparatorBetweenSelectedSegments, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isSingle, BOOL)
RCT_EXPORT_VIEW_PROPERTY(maxSelected, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(minSelected, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(textStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(selectedTextStyle, NSDictionary)

@end
