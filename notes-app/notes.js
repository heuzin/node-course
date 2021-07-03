const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.green.inverse('Your notes'))

  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const diplicateNote = notes.find((note) => note.title === title)

  if (!diplicateNote) {
    notes.push({
      title,
      body,
    })

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) => {
  let notes = loadNotes()
  let removeNote = notes.filter((note) => {
    return note.title !== title
  })

  if (removeNote.length < notes.length) {
    console.log(chalk.green.inverse('Note removed!'))
    notes = removeNote
    saveNotes(notes)
  } else {
    console.log(chalk.red.inverse('No title to remove!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}
