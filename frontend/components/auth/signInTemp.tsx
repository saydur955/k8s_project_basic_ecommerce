// comp
import { Section } from "@/components/shared/section";
import { Typo } from "@/components/shared/typography";
import { NextImage } from "@/components/shared/nextImage";
import { Button } from "../shared/button/button";
import { Fetch } from "@/functions/fetch";
import { setJWTToken, useAuth } from "@/hooks/useAuth";


export const Not_Signed_Temp = () => {

  const { setAuth } = useAuth();


  const signInHanlder = async () => {
    try {

      const res: any = await Fetch({
        url: '/users/signin',
        methodType: 'POST',
        data: {
           "email": "user_01@gmail.com"
        }
      })

      setAuth(res.id)

      setJWTToken(res.jwtToken);

    }
    catch(err) {

    }
  }


  return (
    <Section
      content_sx={{minHeight: '80vh'}}
    >

      <Typo
        txt="You are not signed in"
        align="center"
        variant="h4"
      />

      <div
        style={{
          marginTop: '4rem', display: 'flex', justifyContent: 'center'
        }}
      >

        <NextImage
          src="/images/auth/not_signed_in.jpg"
          alt="not signed in"
          width={350}
          height={318}
        />

      </div>

      <div
        style={{
          marginTop: '8rem', marginBottom: '4rem',
          display: 'flex', justifyContent: 'center'
        }}
      >

        <Button
          onClick={signInHanlder}
        >
          Sign In
        </Button>


      </div>

    </Section>
  )


};