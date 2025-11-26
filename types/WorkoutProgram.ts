interface WorkoutProgram {
  workoutProgramId : number,
  groupId : number,
  name : string | null,
  description : string | null,
  exercises : Exercise[] | null,
  personaltrainerId : number,
  clientId : number | null
}