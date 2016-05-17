package Com.testcases.Album;

import java.awt.AWTException;
import java.io.IOException;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

import Com.Utilities.baseClass;
import Com.backendpages.UsersGroupPermissionspageObject;
import Com.frontendpages.AccountSettingsPageObjects;
import Com.testcases.Login.Frontendlogin;
import Com.testcases.UserPermission.VerifyStartTopic_CategoryPermissions;


//Verify Back end Edit own Image enable/Disable Permissions  With Verify Front End Edit Own Image On Add Photo Image page , Album Page For Register users 

@SuppressWarnings("deprecation")
public class VerifyEditownImages_RegistrerUserPermessions_Profilepage extends
		baseClass {
	String username, password, Filepath, Picturepath;

	public VerifyEditownImages_RegistrerUserPermessions_Profilepage()
			throws IOException {
		username=username("Album", 2, 1);
		password=password("Album", 2, 2);
	
		Filepath = readExcel("Album").getRow(2).getCell(3).getStringCellValue();

		Picturepath = readExcel("Album").getRow(2).getCell(4)
				.getStringCellValue();
   }

	// Disable Edit Own Image  Album settings from back end and verify Album With  add Photos Page  for register users profile page 
	

	//@Test(priority = 0)
	public void VerifyDisableCreateAlbumsettingsfrombackend_verifyAlbumonProfile()
			throws InterruptedException, IOException, AWTException {
		@SuppressWarnings("unused")
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.EditOwnImages_checkbox, false);

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		Filepath = readExcel("Editpage").getRow(111).getCell(7)
				.getStringCellValue();
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();

		Thread.sleep(5000);
		
		attachfile(Album.AddPhotosButton, Filepath);
	  	Thread.sleep(5000);
         Album.PostPhotosButton.click();
		
		
		Assert.assertFalse(verifyPresenceOfElement(By.id("anchor_tab_new_topic_up")));
		Thread.sleep(5000);
		driver.navigate().back();

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	
	// Disable Edit Own Image  Album settings from back end and verify Album With  add Album Page  for Register users Profile Page 
	
	//@Test(priority = 1)
		public void VerifyDisableDeleteOwnAlbumsettingsfrombackend_verifyAlbumsPage()
				throws InterruptedException, IOException {
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
			// Account user permission by checking Album for registered

			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AlbumPermission.Managelink_RegisteredUsers,
					AlbumPermission.ChangePermission_RegisteredUser,
					AlbumPermission.EditOwnImages_checkbox, false);

			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);

	        
	     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();

	     	Thread.sleep(5000);
			Album.AddAlbumsButton.click();
			Thread.sleep(5000);
		driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
			
			Assert.assertFalse(verifyPresenceOfElement(By.id("anchor_tab_new_topic_up")));
			Thread.sleep(5000);
			driver.navigate().back();

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	// Enable Edit own Image Permissions from back end and Verify edit own image on add photo page for registered users profile page 
	
	
	//@Test(priority = 2)
	public void VerifyEnableDeleteOwnImagesettingsfrombackend_verifyDeleteAlbumonAlbumPage()
			throws InterruptedException, IOException, AWTException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.EditOwnImages_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
		Thread.sleep(5000);
		Album.AddAlbumsButton.click();

      driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
      
        Album.EditAlbumButton.click();
		Thread.sleep(5000);
       Album.AlbumSaveButton.click();
       Thread.sleep(3000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	// Enable Edit own Image Permissions from back end and Verify edit own image on add Album Image  page for registered users profile page 
	

		
		@Test(priority = 3)
	public void VerifyEnableDeleteOWnImagesettingsfrombackend_verifyDeleteAlbumonProfilePage()
			throws InterruptedException, IOException, AWTException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.EditOwnImages_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
		Thread.sleep(5000);
		attachfile(Album.AddPhotosButton, Filepath);
	  	Thread.sleep(5000);
         Album.PostPhotosButton.click();
		
		Album.EditAlbumButton.click();
       
      
		Thread.sleep(5000);
	       Album.AlbumSaveButton.click();
	       Thread.sleep(3000);
			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}

	
}
