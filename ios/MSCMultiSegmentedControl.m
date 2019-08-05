#import "MSCMultiSegmentedControl.h"
#import <React/RCTConvert.h>

@interface MultiSelectSegmentedControl (Protected)

- (void)selectSegmentsOfSelectedIndexes;

@end

@implementation MSCMultiSegmentedControl

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _selectedIndices = [MSCMultiSegmentedControl indexSetToArray:self.selectedSegmentIndexes];
    self.delegate = self;
    [self addObserver:self forKeyPath:@"bounds" options:0 context:nil];
  }
  return self;
}

- (void)dealloc
{
  [self removeObserver:self forKeyPath:@"bounds"];
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context
{
  if (object == self && [keyPath isEqualToString:@"bounds"]) {
    [super selectSegmentsOfSelectedIndexes];
  }
}

- (void)multiSelect:(nonnull MultiSelectSegmentedControl *)multiSelectSegmentedControl
     didChangeValue:(BOOL)selected
            atIndex:(NSUInteger)index
{
  BOOL isChanged = YES;
  
  if (_isSingle) {
    self.selectedSegmentIndexes = (selected || _minSelected == 1)
      ? [NSIndexSet indexSetWithIndex:index]
      : [NSIndexSet indexSet];
    
    isChanged = _minSelected != 1 || selected;
  }
  
  if (_maxSelected != 0 && self.selectedSegmentIndexes.count > _maxSelected) {
    NSMutableIndexSet *set = [[NSMutableIndexSet alloc] initWithIndexSet:self.selectedSegmentIndexes];
    [set removeIndex:index];

    self.selectedSegmentIndexes = set;
    isChanged = NO;
  }
  
  if (_minSelected != 0 && self.selectedSegmentIndexes.count < _minSelected) {
    NSMutableIndexSet *set = [[NSMutableIndexSet alloc] initWithIndexSet:self.selectedSegmentIndexes];
    [set addIndex:index];
    
    self.selectedSegmentIndexes = set;
    isChanged = NO;
  }
  
  _selectedIndices = [MSCMultiSegmentedControl indexSetToArray:self.selectedSegmentIndexes];
  
  if (_onChange && isChanged) {
    _onChange(@{
                @"selectedIndices": _selectedIndices,
                @"selectedValues": self.selectedSegmentTitles,
                @"changedIndex": @(index),
                @"changedIndexSelected": @(selected)
                });
  }
}

- (void)setBorderRadius:(float)borderRadius
{
  self.layer.cornerRadius = borderRadius;
  self.layer.borderColor = self.tintColor.CGColor;
  self.layer.borderWidth = 1.0f;
  self.layer.masksToBounds = YES;
}

- (void)setValues:(NSArray<NSString *> *)values
{
  _values = [values copy];
  [self removeAllSegments];
  for (NSString *value in values) {
    [self insertSegmentWithTitle:value atIndex:self.numberOfSegments animated:NO];
  }
  
  self.selectedSegmentIndexes = [MSCMultiSegmentedControl arrayToIndexSet:_selectedIndices];
}

- (void)setSelectedIndices:(NSArray<NSNumber *> *)selectedIndices
{
  _selectedIndices = selectedIndices;
  self.selectedSegmentIndexes = [MSCMultiSegmentedControl arrayToIndexSet:_selectedIndices];
}

+ (nonnull NSArray<NSNumber *> *)indexSetToArray:(NSIndexSet *)set
{
  NSMutableArray *items = [NSMutableArray array];

  [set enumerateIndexesUsingBlock:^(NSUInteger idx, BOOL *stop) {
    [items addObject:[NSNumber numberWithInteger:idx]];
  }];
  
  return items;
}

+ (nonnull NSIndexSet *)arrayToIndexSet:(NSArray<NSNumber *> *)array
{
  NSMutableIndexSet *set = [[NSMutableIndexSet alloc] init];

  [array enumerateObjectsUsingBlock:^(NSNumber * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    [set addIndex:[obj unsignedIntegerValue]];
  }];
  
  return set;
}

@end
