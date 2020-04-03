import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { P, Spacer } from '../VTheme/VTheme'

const FooterBackground = styled.footer`
  background-color: #f3f3f3;
`

const FooterContainer = styled.div`
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;

  @media screen and (min-width: 1300px) {
    width: 80rem;
    margin: auto;
    padding: 0;
  }
`

const FooterGrid = styled.article`
display: grid;
grid-template-columns: 2fr 1fr 1fr;
@media screen and (min-width: 1026px) and (max-width: 1281px) {
   
grid-template-columns: 2fr 1fr 1fr;
  }
  @media screen and (min-width: 768px) and (max-width: 1025px) {

    grid-template-columns: 2fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {

    grid-template-columns: 1fr;
    grid-row-gap: 2rem;
  }
`

const FooterLogo = styled.img`

  width: 2.5rem;
`

const FooterText = styled.div`
  letter-spacing: -0.4px;
  font-size: 1rem;
  margin-top: 1rem;
  width: 24rem;
  @media screen and (max-width: 768px) {

width: 100%;
}
`

const FooterGridItemTitle = styled.h3`
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.2px;
  margin-bottom: 0.5rem;
  color: black;
  list-style: none;
`

const MenuWrapper = styled.ul`
  margin-bottom: 2rem;
  padding: 0;

 
`

const MenuItem = styled.li`
list-style: none;


  a {
    font-weight: 700;
    font-size: 1rem;
    color: #333333;
    letter-spacing: -0.2px;
    line-height: 2;

    :hover {
      color: #6549AA;
    }

  }
`

const Footer = () => (
  <FooterBackground>
    <FooterContainer>

      <Spacer />
      <FooterGrid>

        <div>
          <FooterLogo src='/static/vlogo.svg' alt='voluntarily logo' />
          <FooterText>
            <P>
              <FormattedMessage
                id='footer.credit'
                defaultMessage='Voluntarily is an open source volunteering platform, built by volunteers, to help volunteers volunteer voluntarily for volunteering projects.'
                description='line in the footer that says we are supported by PFCT.'
              />
              <br /><br />A part of the&nbsp;
              <a
                href='https://www.pamfergusson.org.nz/'
                target='_blank'
                rel='noopener noreferrer'
              >
            Pam Fergusson Charitable Trust
              </a>
            </P>
            <P>
              <FormattedMessage
                id='version'
                defaultMessage='Version'
                description='Source coder version label.'
              />
          :&nbsp;
              <FormattedMessage
                id='revision' // set in server.js
                defaultMessage='local-build'
                description='Source code revision, auto generated.'
              >
                {txt => <a href={'https://github.com/voluntarily/vly2/commit/' + txt.split(/[ \- _ ]+/)[0]} rel='noopener noreferrer' target='_blank'>{txt}</a>}
              </FormattedMessage>
            </P>

          </FooterText>
        </div>

        <div>
          <FooterGridItemTitle>Project</FooterGridItemTitle>
          <MenuWrapper>

            <MenuItem><a href='https://blog.voluntarily.nz/get-involved' target='_blank' rel='noopener noreferrer'>Join the build</a></MenuItem>
            <MenuItem><a href='https://voluntarily.atlassian.net/servicedesk/customer/portal/2/group/3/create/17' target='_blank' rel='noreferrer noopener'>Suggest a Topic</a></MenuItem>
            <MenuItem>
              <a
                href='https://voluntarily.statuspage.io'
                target='_blank'
                rel='noopener noreferrer'
              >System Status
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='/terms'
                target='_blank'
                rel='noopener noreferrer'
              >Terms and Conditions
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='/terms/privacy'
                target='_blank'
                rel='noopener noreferrer'
              >Privacy Policy
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='https://github.com/voluntarily/vly2/blob/master/CODE_OF_CONDUCT.md'
                target='_blank'
                rel='noopener noreferrer'
              >Code of Conduct
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='https://github.com/voluntarily/vly2'
                target='_blank'
                rel='noopener noreferrer'
              >Github
              </a>
            </MenuItem>
          </MenuWrapper>
        </div>

        <div>
          <FooterGridItemTitle>Social</FooterGridItemTitle>
          <MenuWrapper>

            <MenuItem>
              <a
                href='http://twitter.com/voluntarilyhq'
                target='_blank'
                rel='noopener noreferrer'
              >Twitter
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='https://www.linkedin.com/groups/13709208/'
                target='_blank'
                rel='noopener noreferrer'
              >LinkedIn
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='https://www.youtube.com/channel/UCEDwH63ojQSq-S8us3iRZAA'
                target='_blank'
                rel='noopener noreferrer'
              >Youtube
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href='https://www.facebook.com/voluntarilyhq/'
                target='_blank'
                rel='noopener noreferrer'
              >Facebook
              </a>
            </MenuItem>

            <MenuItem>
              <a
                href='https://www.instagram.com/voluntarilyhq/'
                target='_blank'
                rel='noopener noreferrer'
              >Instagram
              </a>
            </MenuItem>
          </MenuWrapper>
        </div>
      </FooterGrid>
      <Spacer />

    </FooterContainer>
  </FooterBackground>
)

export default Footer
