# Enroll Me 2 calDAV exporter

## Usage
1. Copy the code located below
2. Paste the code in the URL bar
3. Prepend the code with _javascript:_

```javascript
javascript:(function(){const%20START=new%20Date(2018,1,26,0,0,0);const%20END=new%20Date(2018,5,23,0,0,0);function%20format(a){return%20a.toISOString().substring(10,0).replace(/-/g,'')+'T'+a.toTimeString().substring(5,0).replace(/:/g,'')+'00'}fetch('https://enroll-me-2.iiet.pl/api',{'method':'post','headers':{'Content-Type':'application/json','Authorization':'Bearer%20'+localStorage.getItem('token')},'body':`{%22query%22:%20%22query%20routes_ScheduleWrapperPage_Query%20{%20%20%20%20%20%20%20%20viewer%20{%20%20%20%20%20%20%20%20%20%20...ScheduleWrapperPage_viewer%20%20%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%20%20}%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20fragment%20ScheduleWrapperPage_viewer%20on%20User%20{%20%20%20%20%20%20%20%20roles%20%20%20%20%20%20%20%20enrollments(first:%2010000)%20{%20%20%20%20%20%20%20%20%20%20edges%20{%20%20%20%20%20%20%20%20%20%20%20%20node%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%20%20%20%20%20%20%20%20subjects%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20%20groups%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20key%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20subject%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20classes%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20duration%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20place%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20endTime%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20weekType%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20startTime%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20teacher%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20}%20%20%20%20%20%20}%20%20%20%20%20%20%22,%20%22variables%22:%20{}}`}).then(function(a){return%20a.json()}).then(function(m){let%20h=m.data.viewer.enrollments.edges[0].node;var%20l=new%20Map(h.subjects.map(i=%3E[i.id,i]));var%20d='BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN';for(let%20e%20of%20h.groups){let%20f=l.get(e.subject.id);for(let%20a%20of%20e.classes){let%20j=START.getTime();if(a.weekType==='2'){j+=7*24*60*60*1e3}let%20g=new%20Date(j+a.startTime.day*24*60*60*1e3+a.startTime.minutesFromMidnight*60*1e3);let%20k=new%20Date(g.getTime()+a.duration*60*1e3);let%20c=f.type+'%20-%20'+f.name;if(e.key){c+=',%20gr.%20'+e.key}c+=',%20'+a.teacher.name;d+='
BEGIN:VEVENT'+'
SUMMARY:'+c+'
DTSTART;TZID=Europe/Warsaw:'+format(g)+'
RRULE:FREQ=WEEKLY;UNTIL='+format(END)+'
DTEND:'+format(k)+'
LOCATION:'+a.place+'
END:VEVENT'}}d+='
END:VCALENDAR';var%20b=document.createElement('a');b.setAttribute('href','data:text/calendar,'+encodeURIComponent(d));b.setAttribute('download','calendar.ics');document.body.appendChild(b);b.click()})}())
```