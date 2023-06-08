import {
  LectureState,
  PrismaClient,
  ScheduleModality,
  ScheduleType,
  UserRole,
  Weekday,
} from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    id: 1,
    ucc: "0000000",
    name: "John",
    lastName: "Doe",
    email: "2011640@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 2,
    ucc: "2011640",
    name: "Iván Luis",
    lastName: "Nuñez",
    email: "2011640@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 3,
    ucc: "1902260",
    name: "Juan Manuel",
    lastName: "Villarreal",
    email: "1902260@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 4,
    ucc: "1906675",
    name: "Ramiro",
    lastName: "Ghilino",
    email: "1906675@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 5,
    ucc: "2012317",
    name: "Manuel",
    lastName: "Bobadilla",
    email: "2012317@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 6,
    ucc: "1605234",
    name: "Virginia",
    lastName: "Santos",
    email: "1605234@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 7,
    ucc: "1604245",
    name: "Belen",
    lastName: "Zarazaga",
    email: "1604245@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 8,
    ucc: "123456",
    name: "Fernanda",
    lastName: "Schiavoni",
    email: "123456@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 9,
    ucc: "456123",
    name: "Carlos",
    lastName: "Asselborn",
    email: "456123@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 10,
    ucc: "321654",
    name: "Pablo",
    lastName: "Salas",
    email: "321654@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 11,
    ucc: "654321",
    name: "Francisco",
    lastName: "Arduh",
    email: "654321@ucc.edu.ar",
    role: UserRole.professor,
  },
  {
    id: 12,
    ucc: "2011681",
    name: "Mateo Pablo",
    lastName: "Cetti",
    email: "2011681@ucc.edu.ar",
    role: UserRole.admin,
  },
  {
    id: 13,
    ucc: "2011553",
    name: "Julian",
    lastName: "Perez",
    email: "2011553@ucc.edu.ar",
    role: UserRole.student,
  },
];

const classrooms = [
  {
    "id": 1,
    "name": "Aula 1",
  },
  {
    "id": 2,
    "name": "Aula 2",
  },
  {
    "id": 3,
    "name": "Aula 3",
  },
  {
    "id": 4,
    "name": "Aula 4",
  },
  {
    "id": 5,
    "name": "Aula 5",
  },
  {
    "id": 6,
    "name": "Aula 6",
  },
  {
    "id": 7,
    "name": "Lab. computos A",
  },
  {
    "id": 8,
    "name": "Lab. computos B",
  },
];

const courses = [
  {
    id: 1,
    name: "Admin. P. Soft.",
    startDate: new Date(2023, 3, 8),
    endDate: new Date(2023, 6, 25),
  },
  {
    id: 2,
    name: "Etica y deontologia",
    startDate: new Date(2023, 3, 8),
    endDate: new Date(2023, 6, 25),
  },
  {
    id: 3,
    name: "Pensamiento Social y humanista",
    startDate: new Date(2023, 3, 8),
    endDate: new Date(2023, 6, 25),
  },
  {
    id: 4,
    name: "Ingenieria legal",
    startDate: new Date(2023, 3, 8),
    endDate: new Date(2023, 6, 25),
  },
  {
    id: 5,
    name: "Sistemas inteligentes",
    startDate: new Date(2023, 3, 8),
    endDate: new Date(2023, 6, 25),
  },
];

const schedules = [
  {
    "id": 1,
    "courseId": 1,
    "classroomId": 6,
    "professorId": 6,
    "weekday": Weekday.thursday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.theoretical,
    "startTime": new Date("1970-01-01 19:0:0"),
    "endTime": new Date("1970-01-01 21:0:0"),
  },
  {
    "id": 2,
    "courseId": 1,
    "classroomId": 6,
    "professorId": 7,
    "weekday": Weekday.thursday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.practical,
    "startTime": new Date("1970-01-01 14:0:0"),
    "endTime": new Date("1970-01-01 16:0:0"),
  },
  {
    "id": 3,
    "courseId": 2,
    "classroomId": 1,
    "professorId": 8,
    "weekday": Weekday.monday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.theoretical,
    "startTime": new Date("1970-01-01 14:0:0"),
    "endTime": new Date("1970-01-01 16:0:0"),
  },
  {
    "id": 4,
    "courseId": 3,
    "classroomId": 2,
    "professorId": 9,
    "weekday": Weekday.tuesday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.theoretical,
    "startTime": new Date("1970-01-01 14:0:0"),
    "endTime": new Date("1970-01-01 16:0:0"),
  },
  {
    "id": 5,
    "courseId": 4,
    "classroomId": 3,
    "professorId": 10,
    "weekday": Weekday.tuesday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.theoretical,
    "startTime": new Date("1970-01-01 18:0:0"),
    "endTime": new Date("1970-01-01 21:0:0"),
  },
  {
    "id": 6,
    "courseId": 5,
    "classroomId": 4,
    "professorId": 11,
    "weekday": Weekday.friday,
    "modality": ScheduleModality.f2f,
    "type": ScheduleType.practical,
    "startTime": new Date("1970-01-01 16:0:0"),
    "endTime": new Date("1970-01-01 21:0:0"),
  },
  {
    "id": 7,
    "courseId": 1,
    "classroomId": 2,
    "professorId": 12,
    "weekday": Weekday.monday,
    "modality": ScheduleModality.virtual,
    "type": ScheduleType.laboratory,
    "startTime": new Date("1970-01-01 15:0:0"),
    "endTime": new Date("1970-01-01 17:0:0"),
  },
];

const lectures = [
  {
    "id": 1,
    "scheduleId": 1,
    "date": new Date("2023-06-01"),
    "state": LectureState.delayed,
  },
  {
    "id": 2,
    "scheduleId": 2,
    "date": new Date("2023-06-01"),
    "state": LectureState.scheduled,
  },
  {
    "id": 3,
    "scheduleId": 3,
    "date": new Date("2023-05-29"),
    "state": LectureState.ongoing,
  },
  {
    "id": 4,
    "scheduleId": 4,
    "date": new Date("2023-05-30"),
    "state": LectureState.ongoing,
  },
  {
    "id": 5,
    "scheduleId": 5,
    "date": new Date("2023-05-30"),
    "state": LectureState.scheduled,
  },
  {
    "id": 6,
    "scheduleId": 6,
    "date": new Date("2023-06-02"),
    "state": LectureState.delayed,
  },
  {
    "id": 7,
    "scheduleId": 7,
    "date": new Date("2023-08-31"),
    "state": LectureState.cancelled,
  },
];

async function main() {
  console.log("\nCargando usuarios");
  for (let user in users) {
    await prisma.user.upsert({
      where: {
        id: users[user].id,
      },
      update: {},
      create: {
        ...users[user],
      },
    });
  }
  console.log("Usuarios cargados exitosamente\n");

  console.log("Cargando cursos");
  for (let course in courses) {
    await prisma.course.upsert({
      where: {
        id: courses[course].id,
      },
      update: {},
      create: {
        ...courses[course],
      },
    });
  }
  console.log("Cursos cargados exitosamente\n");

  console.log("Cargando aulas");
  for (let classroom in classrooms) {
    await prisma.classroom.upsert({
      where: {
        id: classrooms[classroom].id,
      },
      update: {},
      create: {
        ...classrooms[classroom],
      },
    });
  }
  console.log("Aulas cargadas exitosamente\n");

  console.log("Cargando horarios");
  for (let schedule in schedules) {
    await prisma.schedule.upsert({
      where: {
        id: schedules[schedule].id,
      },
      update: {},
      create: {
        ...schedules[schedule],
      },
    });
  }
  console.log("Horarios cargados exitosamente\n");

  console.log("Cargando clases");
  for (let lecture in lectures) {
    await prisma.lecture.upsert({
      where: {
        id: lectures[lecture].id,
      },
      update: {},
      create: {
        ...lectures[lecture],
      },
    });
  }
  console.log("Clases cargadas exitosamente\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
