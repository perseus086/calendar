import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ReminderListService {

  private initialReminders = [];

  private reminderListSubject$ = new BehaviorSubject<Reminder[]>(this.initialReminders);

  getReminderList() {
    return this.reminderListSubject$.asObservable();
  }

  addReminder(reminder: Reminder) {
    this.reminderListSubject$.next([...this.reminderListSubject$.value, reminder]);
  }

  remiderAlreadyExists(reminderId: string): boolean {
    return !!this.reminderListSubject$.value.find(reminder => reminder.id === reminderId);
  }

  editReminder(reminderEdited: Reminder): void {
    const index = this.reminderListSubject$.value.findIndex(eachReminder => eachReminder.id === reminderEdited.id);
    const reminders = this.reminderListSubject$.value;
    reminders[index] = reminderEdited;
    this.reminderListSubject$.next(reminders);
  }

  deleteReminder(reminderToDeleteId: string): void {
    const indexToRemove = this.reminderListSubject$.value.findIndex(eachReminder => eachReminder.id === reminderToDeleteId);
    this.reminderListSubject$.next([
      ...this.reminderListSubject$.value.slice(0, indexToRemove),
      ...this.reminderListSubject$.value.slice(indexToRemove + 1)]
    );
  }

  deleteMultipleReminders(reminderIds: string[]) {
    reminderIds.forEach(eachReminderId => {
      this.deleteReminder(eachReminderId);
    });
  }

}
