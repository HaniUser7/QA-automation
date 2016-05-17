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


//Verify Back end enable/disable  Delete Own Image permissions With Front end Delete album image for Album Page, Add photo page On profile page for registred Users 
 //  And Verify Delete image on  Album page 

@SuppressWarnings("deprecation")
public class VerifyDleteAlbum_RegistrerUserPermessions_Profilepage extends
		baseClass {
	String username, password, Filepath, Picturepath;

	public VerifyDleteAlbum_RegistrerUserPermessions_Profilepage()
			throws IOException {
		username=username("Album", 2, 1);
		password=password("Album", 2, 2);
	
		Filepath = readExcel("Album").getRow(2).getCell(3).getStringCellValue();

		Picturepath = readExcel("Album").getRow(2).getCell(4)
				.getStringCellValue();
   }

	// Disable Delete Own Image  Album settings from back end and verify delete own image button on add photo page 
	

	@Test(priority = 0)
	public void VerifyDisableCreateAlbumsettingsfrombackend_verifyAlbumonProfile()
			throws InterruptedException, IOException, AWTException {
		@SuppressWarnings("unused")
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.DeleteOwnImages_checkbox, false);

		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
		Filepath = readExcel("Editpage").getRow(111).getCell(7)
				.getStringCellValue();
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();

		Thread.sleep(5000);
		
		attachfile(Album.AddPhotosButton, Filepath);
	  	Thread.sleep(5000);
         Album.PostPhotosButton.click();
		
		Album.EditAlbumButton.click();
		Assert.assertFalse(verifyPresenceOfElement(By.id("delete_album")));
		Thread.sleep(5000);
		driver.navigate().back();

		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
		
	}
	// Disable Delete Own Image  Album settings from back end and verify delete own image button on Add Album  page 
	

	
	@Test(priority = 1)
		public void VerifyDisableDeleteOwnAlbumsettingsfrombackend_verifyAlbumsPage()
				throws InterruptedException, IOException {
			@SuppressWarnings("unused")
			AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
			UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
			// Account user permission by checking Album for registered

			VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
					AlbumPermission.Managelink_RegisteredUsers,
					AlbumPermission.ChangePermission_RegisteredUser,
					AlbumPermission.DeleteOwnImages_checkbox, false);

			Frontendlogin.loginToApp(username, password);
			Thread.sleep(3000);

	        
	     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();

	     	Thread.sleep(5000);
			Album.AddAlbumsButton.click();
			Thread.sleep(5000);
		driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
			Album.EditAlbumButton.click();
			Assert.assertFalse(verifyPresenceOfElement(By.id("delete_album")));
			Thread.sleep(5000);
			driver.navigate().back();

			Frontendlogin.logoutFromApp();
			Thread.sleep(3000);

			driver.navigate().to((String) Credential.get("FrontendURL"));
		}
	
	// Enable Delete Own Image  Permissions from back end and Verify Delete image in  add photo Image  page  after Verify  Delete Image in Album Images
	
	@Test(priority = 2)
	public void VerifyEnableDeleteOwnImagesettingsfrombackend_verifyDeleteAlbumonAlbumPage()
			throws InterruptedException, IOException, AWTException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.DeleteOwnImages_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
		Thread.sleep(5000);
		Album.AddAlbumsButton.click();

      driver.findElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")).click();
      
       Album.EditAlbumButton.click();
		Thread.sleep(5000);
       
       Album.DeleteAlbumButton.click();
		Thread.sleep(5000);
       driver.switchTo().alert().accept();
		Thread.sleep(5000);
       
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
     	
		Thread.sleep(5000);
		 driver.navigate().refresh();
		 Thread.sleep(5000);
		
		driver.findElement(By.xpath("//li[@class='active']")).click();
		 Thread.sleep(10000);
		Assert.assertTrue(verifyPresenceOfElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")));
		Thread.sleep(5000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}
	// Enable Delete Own Image  Permissions from back end and Verify Delete image in   Add Album Image page  after Verify Deleted image in albums
		
		@Test(priority = 3)
	public void VerifyEnableDeleteOWnImagesettingsfrombackend_verifyDeleteAlbumonProfilePage()
			throws InterruptedException, IOException, AWTException {
		AccountSettingsPageObjects Album = new AccountSettingsPageObjects();
		UsersGroupPermissionspageObject AlbumPermission = new UsersGroupPermissionspageObject();
		// Account user permission by checking Album for registered

		VerifyStartTopic_CategoryPermissions.ChangeUsersGroupPermissions(
				AlbumPermission.Managelink_RegisteredUsers,
				AlbumPermission.ChangePermission_RegisteredUser,
				AlbumPermission.DeleteOwnImages_checkbox, true);
		Frontendlogin.loginToApp(username, password);
		Thread.sleep(3000);
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
		Thread.sleep(5000);
		attachfile(Album.AddPhotosButton, Filepath);
	  	Thread.sleep(5000);
         Album.PostPhotosButton.click();
		
		Album.EditAlbumButton.click();
       
       Album.DeleteAlbumButton.click();
		Thread.sleep(5000);
       driver.switchTo().alert().accept();
		Thread.sleep(5000);
       
        
     	VerifyCreateAlbum_RegistrerUserPermessions_Profilepage. VerifyCreateAlbum();
     	
		Thread.sleep(5000);
		 driver.navigate().refresh();
		 Thread.sleep(5000);
		
		 Thread.sleep(10000);
		Assert.assertFalse(verifyPresenceOfElement(By.xpath(".//*[@id='upload_container']/div[2]/ul/li[1]/span[1]/a")));
		Thread.sleep(5000);
		Frontendlogin.logoutFromApp();
		Thread.sleep(3000);

		driver.navigate().to((String) Credential.get("FrontendURL"));
	}

	
}
