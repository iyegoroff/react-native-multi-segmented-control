#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MSCMultiSegmentedControlManager, RCTViewManager)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(values, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(selectedIndices, NSArray<NSNumber *>)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(borderRadius, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(borderWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(hideDivider, BOOL)
RCT_EXPORT_VIEW_PROPERTY(isSingle, BOOL)
RCT_EXPORT_VIEW_PROPERTY(maxSelected, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(minSelected, NSUInteger)
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(textStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(selectedTextStyle, NSDictionary)

@end
