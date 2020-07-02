import { humanize } from '../src';
import { add } from './utils';
import {
  ONE_MINUTE,
  ONE_WEEK,
  ONE_DAY,
  ONE_HOUR,
  ONE_MONTH,
} from '../src/units';

describe('humanize', () => {
  describe('asMinutes', () => {
    it('should translate as minutes', () => {
      const inOneMinute = add(1, ONE_MINUTE);
      expect(humanize().asMinutes(inOneMinute)).toBe('in less than 1 minute');

      const inOneDay = add(1, ONE_DAY);
      expect(humanize().asMinutes(inOneDay)).toBe('in 1440 minutes');

      const lessThanOneMinuteAgo = add(-1, ONE_MINUTE);
      expect(humanize().asMinutes(lessThanOneMinuteAgo)).toBe('just now');

      const sixMinutesAgo = add(-6, ONE_MINUTE);
      expect(humanize().asMinutes(sixMinutesAgo)).toBe('6 minutes ago');
    });
  });
  describe('asHours', () => {
    it('should translate as hours', () => {
      const inOneMinute = add(1, ONE_MINUTE);
      expect(humanize().asHours(inOneMinute)).toBe('in less than 1 hour');

      const inOneDay = add(1, ONE_DAY);
      expect(humanize().asHours(inOneDay)).toBe('in 24 hours');

      const lessThanOneHourAgo = add(-45, ONE_MINUTE);
      expect(humanize().asHours(lessThanOneHourAgo)).toBe(
        'less than 1 hour ago',
      );

      const sixHoursAgo = add(-6, ONE_HOUR);
      expect(humanize().asHours(sixHoursAgo)).toBe('6 hours ago');
    });
  });
  describe('asDays', () => {
    it('should translate as days', () => {
      const inOneMinute = add(1, ONE_MINUTE);
      expect(humanize().asDays(inOneMinute)).toBe('in less than 1 day');

      const inOneWeek = add(1, ONE_WEEK);
      expect(humanize().asDays(inOneWeek)).toBe('in 7 days');

      const lessThanOneHourAgo = add(-45, ONE_MINUTE);
      expect(humanize().asDays(lessThanOneHourAgo)).toBe('less than 1 day ago');

      const sixDaysAgo = add(-6, ONE_DAY);
      expect(humanize().asDays(sixDaysAgo)).toBe('6 days ago');
    });
  });
  describe('asWeeks', () => {
    it('should translate as weeks', () => {
      const in6Days = add(6, ONE_DAY);
      expect(humanize().asWeeks(in6Days)).toBe('in less than 1 week');

      const inTwelveWeeks = add(12, ONE_MONTH);
      expect(humanize().asWeeks(inTwelveWeeks)).toBe('in 51 weeks');

      const lessThanOneWeekAgo = add(-6, ONE_DAY);
      expect(humanize().asWeeks(lessThanOneWeekAgo)).toBe(
        'less than 1 week ago',
      );

      const sixWeeksAgo = add(-6, ONE_WEEK);
      expect(humanize().asWeeks(sixWeeksAgo)).toBe('6 weeks ago');
    });
  });
  describe('asMonths', () => {
    it('should translate as months', () => {
      const inOneMinute = add(1, ONE_MINUTE);
      expect(humanize().asMonths(inOneMinute)).toBe('in less than 1 month');

      const inTwelveWeeks = add(12, ONE_WEEK);
      expect(humanize().asMonths(inTwelveWeeks)).toBe('in 3 months');

      const lessThanOneMonthAgo = add(-3, ONE_WEEK);
      expect(humanize().asMonths(lessThanOneMonthAgo)).toBe(
        'less than 1 month ago',
      );
      const sixMonthsAgo = add(-27, ONE_WEEK);
      expect(humanize().asMonths(sixMonthsAgo)).toBe('6 months ago');
    });
  });
  describe('asYears', () => {
    it('should translate as months', () => {
      const inOneMinute = add(1, ONE_MINUTE);
      expect(humanize().asYears(inOneMinute)).toBe('in less than 1 year');

      const inThreeYears = add(159, ONE_WEEK);
      expect(humanize().asYears(inThreeYears)).toBe('in 3 years');

      const lessThanOneMonthAgo = add(-3, ONE_WEEK);
      expect(humanize().asYears(lessThanOneMonthAgo)).toBe(
        'less than 1 year ago',
      );
      const sixMonthsAgo = add(-27, ONE_WEEK);
      expect(humanize().asYears(sixMonthsAgo)).toBe('less than 1 year ago');
    });
  });
});
