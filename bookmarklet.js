const START = new Date(2018, 01, 26, 0, 0, 0);
const END = new Date(2018, 05, 23, 0, 0, 0);

function format(date) {
    return date.toISOString().substring(10,0).replace(/-/g,'') + "T" + date.toTimeString().substring(5,0).replace(/:/g, '') + "00";
}

fetch("https://enroll-me-2.iiet.pl/api", {
    "method": "post",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    "body": `{"query": "query routes_ScheduleWrapperPage_Query {
        viewer {
          ...ScheduleWrapperPage_viewer
          id
        }
      }
      
      fragment ScheduleWrapperPage_viewer on User {
        roles
        enrollments(first: 10000) {
          edges {
            node {
              id
              subjects {
                type
                name
                id
              }
              groups {
                key
                subject {
                  id
                }
                classes {
                  duration
                  place
                  endTime
                  weekType
                  startTime
                  teacher {
                    name
                  }
                  id
                }
              }
            }
          }
        }
      }
      ", "variables": {}}`
}).then(function (res) {
    return res.json();
}).then(function (json) {
    let node = json.data.viewer.enrollments.edges[0].node;
    var subjects = new Map(node.subjects.map((i) => [i.id, i]));
    var cal = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN';
    for (let group of node.groups) {
        let subject = subjects.get(group.subject.id);
        for (let clazz of group.classes) {
            let offset = START.getTime();
            if (clazz.weekType === "2") {
                offset += 7 * 24 * 60 * 60 * 1000;
            }
            let start = new Date(offset + clazz.startTime.day * 24 * 60 * 60 * 1000 + clazz.startTime.minutesFromMidnight * 60 * 1000);
            let end = new Date(start.getTime() + clazz.duration * 60 * 1000);
            let summary = subject.type + ' - ' + subject.name;
            if(group.key) {
                summary += ', gr. '+group.key;
            }
            summary += ', ' + clazz.teacher.name;
            cal += '\nBEGIN:VEVENT' +
                '\nSUMMARY:' + summary + 
                '\nDTSTART;TZID=Europe/Warsaw:' + format(start) +
                '\nRRULE:FREQ=WEEKLY;UNTIL=' + format(END) +/*+ (clazz.weekType == null ? '' : ';INTERVAL=2') +*/
                '\nDTEND:' + format(end) +
                '\nLOCATION:' + clazz.place +
                '\nEND:VEVENT';
        }
    }

    cal += '\nEND:VCALENDAR';
    var download = document.createElement("a");
    download.setAttribute("href","data:text/calendar,"+encodeURIComponent(cal));
    download.setAttribute("download", "calendar.ics");
    document.body.appendChild(download);
    download.click();
});
