import RNFetchBlob from 'react-native-fetch-blob'

const REMOTE_URL = 'https://www.dropbox.com/s/ub1pq2nh6trvvqh/Dropbox.pdf'

async function generateFilePath() {
  const dirs = RNFetchBlob.fs.dirs
  const demoDirectory = `${dirs.SDCardDir}/RNAndroidDownloadShare`
  const dirExist = await RNFetchBlob.fs.isDir(demoDirectory)
  if (!dirExist) {
    await RNFetchBlob.fs.mkdir(demoDirectory)
  }
  return `${demoDirectory}/Dropbox.pdf`
}

async function checkFileExistInLocal(filePath) {
  try {
    const exist = await RNFetchBlob.fs.exists(filePath)
    if (exist) return true
    return false
  } catch(err) {
    /* eslint-disable no-console */
    console.log('Check file exist error', err)
    return false
  }
}

export async function downloadFile() {
  const filePath = await generateFilePath()
  if (!filePath) {
    console.log('GenerateFilePath error!')
    return null
  }

  if (await checkFileExistInLocal(filePath)) return filePath

  return RNFetchBlob.config({
    path: filePath,
  }).fetch('GET', REMOTE_URL).then(() => {
    return filePath
  }).catch((err) => {
    console.log(err, 'Error')
    return null
  })
}