package Com.testcases.Album;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.frontendpages.AdvanceSearchPageObjects;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;

//Verify administrator delete And Edit other Users Album on their profile page 

@SuppressWarnings("deprecation")
public class VerifyAdminEdit_deleteOtherUsersAlbumOnProfilePage extends baseClass 
{

   String username, password, username1, Filepath, Picturepath;

     public VerifyAdminEdit_deleteOtherUsersAlbumOnProfilePage()throws IOException {

			username = username("Album", 7, 1);
			password = password("Album", 7, 2);
			username1 = username("Album", 7, 5);

			Filepath = readExcel("Album").getRow(2).getCell(3).getStringCellValue();

			Picturepath = readExcel("Album").getRow(2).getCell(4)
					.getStringCellValue();
		}
	//Verify Administrator  Edit  other user  album on profile page 

	@Test(priority = 0)
	public void VerifyAdministratorEditAlbumForOtherUser_Profilepage()
			throws InterruptedException, IOException, AWTException {
		@SuppressWarnings("unused")
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermessions = new UsersGroupPermissionspageObject();
		AdvanceSearchPageObjects USerAlbum = new AdvanceSearchPageObjects();
		// Account user permission by checking Album for Pending Email User

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		VerifyCreateAlbum_RegistrerUserPermessions_Profilepage.VerifyCreateAlbum();

		Thread.sleep(5000);
		USerAlbum.forumMenu.click();
		Thread.sleep(5000);
	    USerAlbum.Member.click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//strong[text()='" +username1 +"']")).click();
        Thread.sleep(5000);
		
        Album.AddAlbumsButton.click();

        driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
           Thread.sleep(3000);
         Album.EditAlbumButton.click();
  		Thread.sleep(5000);
         Album.AlbumSaveButton.click();
         Thread.sleep(3000);
  		Frontendlogin.logoutFromApp();
  		Thread.sleep(3000);

  		driver.navigate().to((String) Credential.get("FrontendURL"));
  	}

	//Verify Administrator  delete other user  album on profile page 

	@Test(priority = 1)
	public void VerifyAdministratorDeleteAlbumForOtherUser_Profilepage()
			throws InterruptedException, IOException, AWTException {
		@SuppressWarnings("unused")
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermessions = new UsersGroupPermissionspageObject();
		AdvanceSearchPageObjects USerAlbum = new AdvanceSearchPageObjects();
		// Account user permission by checking Album for Pending Email User

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		
		VerifyCreateAlbum_RegistrerUserPermessions_Profilepage.VerifyCreateAlbum();
		Thread.sleep(5000);
		USerAlbum.forumMenu.click();
		Thread.sleep(5000);
	    USerAlbum.Member.click();
		Thread.sleep(5000);
		driver.findElement(By.xpath("//strong[text()='" +username1 +"']")).click();
        Thread.sleep(5000);
        Album.AddAlbumsButton.click();
        driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
         Thread.sleep(3000);
         Album.EditAlbumButton.click();
  		Thread.sleep(5000);
  		 Album.DeleteAlbumButton.click();
 		Thread.sleep(5000);
        driver.switchTo().alert().accept();
		 Thread.sleep(5000);
		
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}}
	
