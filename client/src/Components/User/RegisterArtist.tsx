import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Avatar, Typography, TextField, Button, TextareaAutosize } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    height: '100vh',
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
  },
  section: {
    // TODO: 모바일 스타일 적용
    margin: '50px 80px 50px 80px',
  },
  inputContainer: {
    maxWidth: '400px',
    margin: '30px 30px 30px 60px',
  },
  input: {
    width: '100%',
    marginBottom: '20px',
  },
  largeAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}))

interface UploadPostInputProps {
  title: string
  thumbnail: FileList | null
}

const UPLOAD_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $thumbnail: Upload!) {
    createPost(title: $title, thumbnail: $thumbnail) {
      success
    }
  }
`

const RegisterArtist: FunctionComponent = () => {
  const classes = useStyles({})
  const [imgBase64, setImgBase64] = useState('')
  const [createPost] = useMutation(UPLOAD_POST_MUTATION)
  const [inputs, setInputs] = useState<UploadPostInputProps>({
    title: '',
    thumbnail: null,
  })

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader()
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0])
      reader.onload = () => {
        const base64 = reader.result
        if (base64) {
          setImgBase64(base64.toString())
        }
      }
    }
  }

  const handleUpload = async () => {
    console.log('inputs.thumbnail :', inputs.thumbnail)
    const { data } = await createPost({
      variables: {
        title: inputs.title,
        thumbnail: inputs.thumbnail,
      },
    })

    console.log(data)
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.files,
    })
  }

  console.log('inputs:', inputs)

  const { register, handleSubmit, control, errors, getValues, setError, clearErrors } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    console.log('??????')
  }
  const { artistName } = getValues(['artistName'])
  console.log('artistName:', artistName)
  console.log('error:', errors)

  return (
    <div className={classes.centerArea}>
      <h3>작가 등록</h3>
      <div className={classes.inputContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.input}
            autoFocus
            name="artistName"
            label="필명(닉네임)"
            placeholder="필명(닉네임)"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 32,
                message: '필명(닉네임)은 32자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.input}
            name="realName"
            label="성명"
            placeholder="성명"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 32,
                message: '성명은 32자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.input}
            name="phone"
            type="tel"
            label="휴대전화 번호"
            placeholder="휴대전화 번호"
            variant="outlined"
            required={true}
            inputRef={register({
              minLength: {
                value: 10,
                message: '휴대전화 번호는 10자 이상으로 입력해주세요.',
              },
            })}
          />
          <TextareaAutosize
            className={classes.input}
            rowsMin={5}
            placeholder="작가를 소개하는 글입니다. 작가로서 가치관, 작품 세계 등 본인의 생각을 자유롭게 표현해주세요."
            // label="본인 소개"
            // variant="outlined"
          />
          <Typography variant="subtitle1">프로필 이미지</Typography>
          <input type="file" name="thumbnail" accept="image/*" onChange={handleChangeThumbnail} />
          <Avatar src={imgBase64} className={classes.largeAvatar} />
          <Button style={{ float: 'right' }} type="submit" color="primary" variant="contained">
            등록하기
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterArtist
