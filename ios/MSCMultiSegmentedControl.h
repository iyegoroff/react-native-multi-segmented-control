#import <React/RCTComponent.h>
#import "MultiSelectSegmentedControl.h"

@interface MSCMultiSegmentedControl : MultiSelectSegmentedControl <MultiSelectSegmentedControlDelegate>

@property (nonatomic, copy) NSArray<NSString *> *values;
@property (nonatomic, copy) NSArray<NSNumber *> *selectedIndices;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, assign) BOOL isSingle;
@property (nonatomic, assign) NSUInteger maxSelected;
@property (nonatomic, assign) NSUInteger minSelected;

@end
